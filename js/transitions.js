/**
 * Screen transition orchestrator.
 * Handles fade transitions between the 3 main screens.
 */

const TRANSITION_DURATION = 600;

let isTransitioning = false;

/**
 * Transition from one screen to another.
 * @param {string} fromId - ID of current screen
 * @param {string} toId - ID of target screen
 * @param {Function} [onMid] - Callback at midpoint (optional)
 * @returns {Promise}
 */
function transitionTo(fromId, toId, onMid) {
  if (isTransitioning) return Promise.resolve();
  isTransitioning = true;

  const from = document.getElementById(fromId);
  const to = document.getElementById(toId);

  return new Promise((resolve) => {
    // Exit current screen
    from.classList.add('exiting');
    from.classList.remove('active');

    setTimeout(() => {
      from.classList.remove('exiting');

      if (onMid) onMid();

      // Enter new screen
      to.classList.add('active');

      setTimeout(() => {
        isTransitioning = false;
        resolve();
      }, TRANSITION_DURATION);
    }, TRANSITION_DURATION / 2);
  });
}

export { transitionTo };
