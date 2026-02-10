import { QUESTIONS } from './questions.js';
import { calculateScore, getProfile } from './scoring.js';
import { transitionTo } from './transitions.js';

let currentQuestionIndex = 0;
let answers = {};
let pendingCleanup = null;
let navigationEpoch = 0;

/**
 * Initialize the form screen.
 */
function initForm() {
  renderQuestion(currentQuestionIndex, 'none');
  updateProgress();
}

/**
 * Render a question by index.
 * @param {number} index
 * @param {'left'|'right'|'none'} direction - Animation direction
 */
function renderQuestion(index, direction) {
  const q = QUESTIONS[index];
  const wrapper = document.getElementById('question-area');

  const stepInfo = document.getElementById('step-info');
  stepInfo.innerHTML = `
    <span class="step-indicator__label">${index + 1}/${QUESTIONS.length}</span>
    <span>\u2014 ${q.stepTitle}</span>
  `;

  // Flush any pending cleanup from a previous transition
  if (pendingCleanup) {
    clearTimeout(pendingCleanup.timer);
    pendingCleanup.execute();
    pendingCleanup = null;
  }

  const newSlide = document.createElement('div');
  newSlide.className = 'question-slide';
  newSlide.innerHTML = `
    <h2 class="question-title">${q.text}</h2>
    <div class="options-list options-stagger">
      ${q.options.map((opt, i) => `
        <div class="option${answers[q.id] === i ? ' selected' : ''}" data-index="${i}">
          <div class="option__radio">
            <div class="option__radio-dot"></div>
          </div>
          <span class="option__text">${opt.label}</span>
        </div>
      `).join('')}
    </div>
  `;

  if (direction === 'none') {
    wrapper.innerHTML = '';
    wrapper.appendChild(newSlide);
  } else {
    const oldSlide = wrapper.querySelector('.question-slide');
    const exitClass = direction === 'left' ? 'slide-left' : 'slide-right';
    const enterClass = direction === 'left' ? 'slide-right' : 'slide-left';

    // Position new slide off-screen
    newSlide.classList.add(enterClass);
    wrapper.appendChild(newSlide);

    // Trigger reflow then animate
    newSlide.offsetHeight;

    if (oldSlide) oldSlide.classList.add(exitClass);
    newSlide.classList.remove(enterClass);

    // Schedule cleanup — can be flushed early by the next transition
    const cleanup = () => {
      if (oldSlide && oldSlide.parentNode) oldSlide.remove();
    };
    const timer = setTimeout(() => {
      cleanup();
      pendingCleanup = null;
    }, 550);
    pendingCleanup = { timer, execute: cleanup };
  }

  // Bind option clicks on the new slide directly (no ID lookup needed)
  const options = newSlide.querySelectorAll('.option');
  options.forEach((opt) => {
    opt.addEventListener('click', () => {
      const optIndex = parseInt(opt.dataset.index);
      selectOption(q.id, optIndex, options);
    });
  });

  updateNav();
}

/**
 * Handle option selection.
 */
function selectOption(questionId, optionIndex, allOptions) {
  answers[questionId] = optionIndex;

  allOptions.forEach((o, i) => {
    o.classList.toggle('selected', i === optionIndex);
  });

  updateNav();

  // Auto-advance after a short delay (guarded by epoch)
  const epoch = navigationEpoch;
  setTimeout(() => {
    if (epoch === navigationEpoch && currentQuestionIndex < QUESTIONS.length - 1) {
      goNext();
    }
  }, 300);
}

/**
 * Update progress bar.
 */
function updateProgress() {
  const fill = document.getElementById('progress-fill');
  const pct = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;
  fill.style.width = `${pct}%`;
}

/**
 * Update navigation buttons.
 */
function updateNav() {
  const nav = document.getElementById('form-nav');
  const q = QUESTIONS[currentQuestionIndex];
  const isFirst = currentQuestionIndex === 0;
  const isLast = currentQuestionIndex === QUESTIONS.length - 1;
  const hasAnswer = answers[q.id] !== undefined;

  let html = '';

  if (!isFirst) {
    html += `<button class="btn-ghost" id="btn-prev">\u2190 Back</button>`;
  } else {
    html += `<div></div>`;
  }

  if (isLast && hasAnswer) {
    html += `<button class="btn-primary" id="btn-submit">See Results \u2192</button>`;
  }

  nav.innerHTML = html;
  nav.className = isFirst ? 'form-nav form-nav--end' : 'form-nav';

  const prevBtn = document.getElementById('btn-prev');
  if (prevBtn) prevBtn.addEventListener('click', goPrev);

  const submitBtn = document.getElementById('btn-submit');
  if (submitBtn) submitBtn.addEventListener('click', submitForm);
}

/**
 * Navigate to next question.
 */
function goNext() {
  if (currentQuestionIndex >= QUESTIONS.length - 1) return;
  navigationEpoch++;
  currentQuestionIndex++;
  renderQuestion(currentQuestionIndex, 'left');
  updateProgress();
}

/**
 * Navigate to previous question.
 */
function goPrev() {
  if (currentQuestionIndex <= 0) return;
  navigationEpoch++;
  currentQuestionIndex--;
  renderQuestion(currentQuestionIndex, 'right');
  updateProgress();
}

/**
 * Submit the form and show results.
 */
function submitForm() {
  const score = calculateScore(answers, QUESTIONS);
  const profile = getProfile(score);

  // Dispatch custom event with results
  window.dispatchEvent(new CustomEvent('quiz-complete', {
    detail: { score, profile }
  }));
}

/**
 * Reset form state for retake.
 */
function resetForm() {
  currentQuestionIndex = 0;
  answers = {};
  pendingCleanup = null;
  navigationEpoch++;
  renderQuestion(0, 'none');
  updateProgress();
}

export { initForm, resetForm };
