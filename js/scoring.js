import { PROFILES } from './profiles.js';

/**
 * Calculate total score from answers.
 * @param {Object} answers - Map of question id → selected option index
 * @param {Array} questions - The QUESTIONS array
 * @returns {number} Clamped score 0-30
 */
function calculateScore(answers, questions) {
  let total = 0;

  for (const question of questions) {
    const selectedIndex = answers[question.id];
    if (selectedIndex !== undefined && question.options[selectedIndex]) {
      total += question.options[selectedIndex].score;
    }
  }

  return Math.max(0, Math.min(30, total));
}

/**
 * Get the matching profile for a given score.
 * @param {number} score
 * @returns {Object} The matching profile
 */
function getProfile(score) {
  for (const profile of PROFILES) {
    if (score >= profile.range[0] && score <= profile.range[1]) {
      return profile;
    }
  }
  // Fallback to lowest profile
  return PROFILES[PROFILES.length - 1];
}

export { calculateScore, getProfile };
