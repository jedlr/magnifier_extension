# Accessible UI Magnifier Extension

The Accessible UI Magnifier Extension is a web-based tool designed to enhance digital content accessibility through various magnification techniques. This Chrome extension offers three distinct magnification methods, catering to users with visual impairments or anyone needing closer examination of webpage elements.

## Features

### Browser Zoom
- Utilizes the built-in browser zoom to enlarge or shrink the entire webpage.
- Activated by pressing the `+` or `-` keys to adjust the zoom level incrementally.

### Graphical Zoom
- Scales the size of webpage pixels for magnification without altering the layout.
- Activated by pressing `Shift +` or `Shift -` to increase or decrease magnification.
- Implements left and right screen edge detection for horizontal scrolling when the magnified content exceeds the viewport width.

### Refactoring Content
- Enhances the visibility of selected webpage elements (text or images) by displaying them in a larger, centered format on the screen.
- Activated by pressing and releasing the spacebar to display the selected element in an enlarged format. Pressing the spacebar again dismisses the enlarged view.
- This method dynamically adjusts to browser size changes, ensuring optimal positioning of refactored content.

## Installation

1. Clone this repository to your local machine.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable Developer Mode by toggling the switch at the top right.
4. Click the "Load unpacked" button and select the extension directory (`magnifier_extension`) from the cloned repository.

## Usage

To use the extension, simply navigate to a webpage and utilize the feature-specific activation keys mentioned above. Test the extension's functionality using the provided test site: [https://sarahmorrisonsmith.com/accessibility/test.html](https://sarahmorrisonsmith.com/accessibility/test.html).

## Contributing

Your contributions are welcome to improve the extension or add new features. Please fork the repository, make your changes, and submit a pull request for review.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
