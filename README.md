# Focus Timer with Ambient Sounds

A Pomodoro-style Chrome extension designed to enhance your productivity by providing a customizable timer alongside soothing ambient sounds.

## Features

- **Customizable Timer**: Easily set your preferred durations for work and break sessions.
- **Ambient Sounds**: Choose from a variety of calming sounds such as Rain, Forest, and Coffee Shop to create a focused environment.
- **Persistent Timer**: The timer continues running even when the extension popup is closed, allowing uninterrupted browsing.
- **Desktop Notifications**: Receive notifications when work or break sessions start and end.
- **Lightweight Design**: Minimalistic and user-friendly interface for a seamless experience.
- **Author Information**: Displays the creator's name within the extension.

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yasinULLAH/chrome-timer-extension.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd chrome-timer-extension
   ```

3. **Load the Extension in Chrome**

   - Open Google Chrome and go to `chrome://extensions/`.
   - Enable "Developer mode" by toggling the switch in the top right corner.
   - Click on the "Load unpacked" button and select the `chrome-timer-extension` directory.

   The extension should now appear in your Chrome toolbar.

## Usage

1. **Open the Extension**

   Click on the extension icon in the Chrome toolbar to open the popup interface.

2. **Configure Timer Settings**

   - **Work Duration**: Set the number of minutes for your work sessions.
   - **Break Duration**: Set the number of minutes for your break sessions.
   - **Ambient Sound**: Select an ambient sound from the dropdown menu to play during your sessions.

3. **Control the Timer**

   - **Start**: Begin the timer with your configured settings.
   - **Pause**: Pause the ongoing timer.
   - **Reset**: Reset the timer to its initial state.

4. **Persistent Operation**

   Once the timer is started, it will continue to run in the background even if you close the popup or navigate to other tabs. To stop the timer and ambient sounds, use the Pause or Reset buttons within the popup.

## Development

To contribute or modify the extension:

1. **Prerequisites**

   - Ensure you have [Node.js](https://nodejs.org/) installed (if you plan to add more advanced features or build tools).

2. **Make Changes**

   - Modify the source files as needed. The primary files include:
     - `manifest.json`: Configuration and permissions for the extension.
     - `popup.html`: The HTML structure of the popup interface.
     - `styles.css`: Styling for the popup.
     - `popup.js`: Handles user interactions and communicates with the background script.
     - `background.js`: Manages the timer logic and ambient sound playback.
     - `offscreen.html` & `offscreen.js`: Handle background audio playback.
     - `sounds/`: Directory containing ambient sound files.
     - `icons/`: Directory containing extension icons.

3. **Reload the Extension**

   - After making changes, go back to `chrome://extensions/` in Chrome.
   - Click the "Reload" button for the Focus Timer extension to apply your changes.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your enhancements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).

---

**Note**: Ensure that all ambient sound files are properly licensed for use and distribution. Replace `[LICENSE](LICENSE)` with the actual license file or remove the section if not applicable.
