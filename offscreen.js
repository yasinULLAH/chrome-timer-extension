let sound = null;

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'playSound') {
    playSound(request.soundName);
  } else if (request.action === 'pauseSound') {
    pauseSound();
  }
});

// Play the selected ambient sound
function playSound(soundName) {
  if (sound) {
    sound.pause();
    sound = null;
  }
  if (soundName === 'none') return;

  sound = document.getElementById('background-sound');
  sound.src = chrome.runtime.getURL(`sounds/${soundName}.mp3`);
  sound.play();
}

// Pause the ambient sound
function pauseSound() {
  if (sound) {
    sound.pause();
    sound.currentTime = 0;
    sound = null;
  }
}
