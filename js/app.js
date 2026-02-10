import { transitionTo } from './transitions.js';
import { initForm, resetForm } from './form.js';
import { copyToClipboard, shareOnTwitter } from './share.js';

/**
 * Boot the app.
 */
console.log(`%c
  You opened the console.

  Looking for React? Vue? Svelte? Angular?

  There's nothing here. Just HTML, CSS, and JS.
  The kind your browser actually understands
  without 14 build steps and a prayer.

  Total dependencies: 0
  Total build time: 0ms
  Total existential dread: also 0

  Welcome home.

`, 'color: #6366F1; font-size: 13px; line-height: 1.6;');

console.log('%c> npm install sanity', 'color: #10B981; font-family: monospace; font-size: 12px;');
console.log('%cpackage not found. try clean-architecture instead.', 'color: #6B7280; font-family: monospace; font-size: 11px;');

document.addEventListener('DOMContentLoaded', () => {
  // ===== CTA: Hero → Form =====
  document.getElementById('cta-start').addEventListener('click', () => {
    transitionTo('screen-hero', 'screen-form', () => {
      initForm();
    });
  });

  // ===== Quiz Complete → Results =====
  window.addEventListener('quiz-complete', (e) => {
    const { score, profile } = e.detail;
    renderResults(score, profile);
    transitionTo('screen-form', 'screen-results');
  });
});

/**
 * Render the results screen content.
 * @param {number} score
 * @param {Object} profile
 */
function renderResults(score, profile) {
  const container = document.getElementById('results-content');

  container.innerHTML = `
    <div class="result-score">${score}<span class="result-score__max">/30</span></div>
    <span class="result-badge result-badge--${profile.color}">${profile.title}</span>
    <p class="result-profile">${profile.tagline}</p>
    <p class="result-tagline">${profile.diagnostic}</p>
    <div class="result-recs">
      <p class="result-recs__title">Recommendations</p>
      <div class="result-recs__list">
        ${profile.recommendations.map(r => `
          <div class="result-recs__item">${r}</div>
        `).join('')}
      </div>
    </div>
    <div class="result-actions">
      <button class="btn-secondary" id="btn-share-copy">Copy Result</button>
      <button class="btn-secondary" id="btn-share-twitter">Share on <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: -2px"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></button>
      <button class="btn-ghost" id="btn-retake">\u21BB Retake</button>
    </div>
  `;

  container.className = 'container result-enter';

  // Bind share actions
  document.getElementById('btn-share-copy').addEventListener('click', () => {
    copyToClipboard(score, profile);
  });

  document.getElementById('btn-share-twitter').addEventListener('click', () => {
    shareOnTwitter(score, profile);
  });

  document.getElementById('btn-retake').addEventListener('click', () => {
    transitionTo('screen-results', 'screen-form', () => {
      resetForm();
    });
  });
}
