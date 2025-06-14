
const startDate = new Date('2025-06-10T00:00:00');
const endDate = new Date('2025-06-31T23:59:59');
const timerDiv = document.getElementById('timer');

function updateTimer() {
  const now = new Date();
  if (now < startDate) {
    timerDiv.textContent = `Countdown starts on June 10, 2025.`;
    return;
  }
  if (now > endDate) {
    timerDiv.textContent = `The construction period has ended.`;
    return;
  }
  const diff = endDate - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  timerDiv.textContent = `Time left: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

updateTimer();
setInterval(updateTimer, 1000); 