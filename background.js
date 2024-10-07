let workDuration = 25 * 60; // in seconds
let breakDuration = 5 * 60; // in seconds
let isWork = true;
let remainingTime = workDuration;
let timerInterval = null;
let ambientSound = 'none';
let timerRunning = false;

// Initialize from storage
chrome.storage.local.get(['workDuration', 'breakDuration', 'ambientSound'], (data) => {
  if (data.workDuration) workDuration = data.workDuration;
  if (data.breakDuration) breakDuration = data.breakDuration;
  if (data.ambientSound) ambientSound = data.ambientSound;
  remainingTime = isWork ? workDuration : breakDuration;
});

// Handle incoming messages from popup and offscreen
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch(request.action) {
    case 'startTimer':
      startTimer();
      break;
    case 'pauseTimer':
      pauseTimer();
      break;
    case 'resetTimer':
      resetTimer();
      break;
    case 'setDurations':
      workDuration = request.workDuration;
      breakDuration = request.breakDuration;
      chrome.storage.local.set({ workDuration, breakDuration });
      if (!isWork) {
        remainingTime = breakDuration;
      } else {
        remainingTime = workDuration;
      }
      updatePopup();
      break;
    case 'setAmbientSound':
      ambientSound = request.ambientSound;
      chrome.storage.local.set({ ambientSound });
      handleAmbientSound();
      break;
    case 'getTimerStatus':
      sendResponse({ remainingTime, isWork });
      break;
    case 'playSound':
      // Forward to offscreen
      chrome.runtime.sendMessage({ action: 'playSound', soundName: request.soundName });
      break;
    case 'pauseSound':
      // Forward to offscreen
      chrome.runtime.sendMessage({ action: 'pauseSound' });
      break;
    default:
      break;
  }
  return true;
});

// Start the timer
function startTimer() {
  if (timerRunning) return;
  timerRunning = true;
  timerInterval = setInterval(countdown, 1000);
  chrome.notifications.create('timerStarted', {
    type: 'basic',
    iconUrl: 'icons/icon48.png',
    title: 'Focus Timer',
    message: 'Timer started!',
    silent: true
  });

  // Start ambient sound if not already playing
  if (ambientSound !== 'none') {
    handleAmbientSound();
  }
}

// Pause the timer
function pauseTimer() {
  if (!timerRunning) return;
  clearInterval(timerInterval);
  timerInterval = null;
  timerRunning = false;
  chrome.notifications.create('timerPaused', {
    type: 'basic',
    iconUrl: 'icons/icon48.png',
    title: 'Focus Timer',
    message: 'Timer paused.',
    silent: true
  });

  // Pause ambient sound
  chrome.runtime.sendMessage({ action: 'pauseSound' });
}

// Reset the timer
function resetTimer() {
  pauseTimer();
  isWork = true;
  remainingTime = workDuration;
  updatePopup();
}

// Countdown function
function countdown() {
  if (remainingTime > 0) {
    remainingTime--;
    updatePopup();
  } else {
    // Timer ended, switch between work and break
    isWork = !isWork;
    remainingTime = isWork ? workDuration : breakDuration;
    updatePopup();
    
    // Notify user
    chrome.notifications.create('timerEnded', {
      type: 'basic',
      iconUrl: 'icons/icon48.png',
      title: 'Focus Timer',
      message: isWork ? 'Work session started!' : 'Break session started!',
      silent: true
    });

    // Play ambient sound for the new session
    if (ambientSound !== 'none') {
      handleAmbientSound();
    }
  }
}

// Update the popup with the current timer status
function updatePopup() {
  chrome.runtime.sendMessage({ action: 'updateTimer', remainingTime, isWork });
}

// Handle ambient sound playback
async function handleAmbientSound() {
  if (ambientSound === 'none') {
    chrome.runtime.sendMessage({ action: 'pauseSound' });
    return;
  }
  await ensureOffscreen();
  chrome.runtime.sendMessage({ action: 'playSound', soundName: ambientSound });
}

// Ensure that the offscreen document exists
async function ensureOffscreen() {
  if (await chrome.offscreen.hasDocument()) {
    return;
  }
  await chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: ['AUDIO_PLAYBACK'],
    justification: 'Play ambient sounds in the background.'
  });
}
