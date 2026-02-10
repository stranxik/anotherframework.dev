/**
 * Share functionality — clipboard + Twitter/X
 */

/**
 * Copy result to clipboard.
 * @param {number} score
 * @param {Object} profile
 */
function copyToClipboard(score, profile) {
  const text = `I scored ${score}/30 on "Do You Really Need That Framework?" — I'm a "${profile.title}" />\n\nhttps://anotherframework.dev`;

  navigator.clipboard.writeText(text).then(() => {
    showToast('Copied to clipboard!');
  }).catch(() => {
    showToast('Failed to copy');
  });
}

/**
 * Share on Twitter/X.
 * @param {number} score
 * @param {Object} profile
 */
function shareOnTwitter(score, profile) {
  const text = encodeURIComponent(
    `I scored ${score}/30 on "Do You Really Need That Framework?" — I'm a "${profile.title}" />`
  );
  const url = encodeURIComponent('https://anotherframework.dev');
  window.open(`https://x.com/intent/post?text=${text}&url=${url}`, '_blank');
}

/**
 * Show a toast notification.
 * @param {string} message
 */
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('visible');

  setTimeout(() => {
    toast.classList.remove('visible');
  }, 2000);
}

export { copyToClipboard, shareOnTwitter };
