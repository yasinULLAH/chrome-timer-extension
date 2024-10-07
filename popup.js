document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start');
  const pauseButton = document.getElementById('pause');
  const resetButton = document.getElementById('reset');
  const workInput = document.getElementById('work-duration');
  const breakInput = document.getElementById('break-duration');
  const soundSelect = document.getElementById('ambient-sound');
  const timerDisplay = document.getElementById('timer');

  // Initialize settings from storage
  chrome.storage.local.get(['workDuration', 'breakDuration', 'ambientSound'], (data) => {
    if (data.workDuration) workInput.value = data.workDuration / 60;
    if (data.breakDuration) breakInput.value = data.breakDuration / 60;
    if (data.ambientSound) soundSelect.value = data.ambientSound;
    
    // Initialize timer display
    chrome.runtime.sendMessage({ action: 'getTimerStatus' }, (response) => {
      if (response) {
        updateTimerDisplay(response.remainingTime, response.isWork);
      } else {
        // Default display
        updateTimerDisplay(workInput.value * 60, true);
      }
    });
  });

  // Event Listeners
  startButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'startTimer' });
  });

  pauseButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'pauseTimer' });
  });

  resetButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'resetTimer' });
  });

  soundSelect.addEventListener('change', () => {
    const selectedSound = soundSelect.value;
    chrome.runtime.sendMessage({ action: 'setAmbientSound', ambientSound: selectedSound });
  });

  workInput.addEventListener('change', () => {
    const workDuration = parseInt(workInput.value) * 60;
    const breakDuration = parseInt(breakInput.value) * 60;
    chrome.runtime.sendMessage({ action: 'setDurations', workDuration, breakDuration });
  });

  breakInput.addEventListener('change', () => {
    const workDuration = parseInt(workInput.value) * 60;
    const breakDuration = parseInt(breakInput.value) * 60;
    chrome.runtime.sendMessage({ action: 'setDurations', workDuration, breakDuration });
  });

  // Listen for timer updates from background
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateTimer') {
      updateTimerDisplay(request.remainingTime, request.isWork);
    }
  });

  // Update the timer display
  function updateTimerDisplay(remainingTime, isWork) {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timerDisplay.textContent = `${pad(minutes)}:${pad(seconds)}`;
    
    // Optionally, change color based on work or break
    if (isWork) {
      timerDisplay.style.color = '#d9534f'; // Red for work
    } else {
      timerDisplay.style.color = '#5cb85c'; // Green for break
    }
  }

  // Pad single digit numbers with a leading zero
  function pad(num) {
    return num < 10 ? '0' + num : num;
  }
});
