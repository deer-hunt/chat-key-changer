# Chat-Key-Changer

![Logo](./images/logo.png)

"Chat-Key-Changer" is a Chrome extension that swaps Enter and Shift+Enter key behavior in AI chat services for improved usability.

## 💡 Why This Extension?

Have you ever experienced these frustrations while chatting with AI?

- **Accidental sends**: Pressing `Enter` to add a new line but accidentally sending an incomplete message
- **Awkward key combinations**: `Shift+Enter` is uncomfortable and hard to press, especially during long conversations
- **Workflow interruption**: Constantly thinking about which key combination to use breaks your flow of thought
- **Inconsistent behavior**: Each chat service works differently, causing confusion when switching between platforms

This extension solves these pain points by reversing the key behavior to match what feels more natural for most users:
- `Enter` → **Add new line** (natural for text editing)
- `Shift+Enter` → **Send message** (intentional action requiring modifier key)

**This way, your chat life will finally be free from frustration. **

## 🚀 Features

- **Key Behavior Swap**: 
  - `Enter` → Insert new line
  - `Shift+Enter` → Send message
- **Multi-Service Support**: Works across popular AI chat platforms
- **Zero Configuration**: Works out of the box after installation
- **Completely Free and No Dark Patterns**: No user registration, no premium features, no hidden costs. Unlike many Chrome extensions that lure users with basic features only to push paid upgrades, this extension provides all functionality completely free.


## 🎯 Supported AI Chat Services

- **ChatGPT** (OpenAI)
- **Claude** (Anthropic)
- **Canva AI** (Canva)
- **GitHub Copilot Chat** (Github)
- **Microsoft Copilot** (Microsoft)
- **Google Gemini** (Google)
- **Poe** (Quora)
- **Genspark** (MainFunc)
- **Grok** (X.AI)
- **Perplexity AI** (Perplexity AI)
- **DeepSeek** (DeepSeek)
- **Notion AI** (Notion Labs)

## 📦 Installation

**Note: This extension is not available on the Chrome Web Store and requires manual installation.**

### Manual Installation (Developer Mode)

1. **Download the extension**
   ```bash
   Download ZIP
   or
   git clone https://github.com/deer-hunt/chat-key-changer.git
   
   cd chat-key-changer
   ```

2. **Enable Developer Mode in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Toggle "Developer mode" in the top right corner

3. **Load the extension**
   - Click "Load unpacked"
   - Select the `src` folder
   - The extension should now appear in your extensions list

4. **Start using**
   - Visit any supported AI chat service. e.g. [ChatGPT](https://chatgpt.com/)
   - The key behavior will be automatically swapped in input fields

> 📖 **Need help with manual installation?** See Google's official guide: [Load an unpacked extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked)

## 🔧 How It Works

The extension uses advanced DOM monitoring techniques to detect input fields across different AI chat services:

- **MutationObserver**: Monitors for dynamically added elements
- **Periodic Checking**: Ensures compatibility with complex UI updates
- **Site-Specific Selectors**: Optimized selectors for each supported service
- **Event Interception**: Captures and modifies keyboard events in real-time


### Browser Compatibility
- **Chrome**: 88+ (Manifest V3 support)
- **Edge**: 88+ (Chromium-based)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Issues
- Use the [GitHub Issues](https://github.com/deer-hunt/chat-key-changer/issues) page
- Include browser version, extension version, and affected site
- Provide steps to reproduce the issue


## 📝 Changelog

### v1.0.0 (2025-07-14)

- First release.


## 🔍 Privacy

This extension:
- ✅ **Does NOT collect any personal data**
- ✅ **Does NOT send data to external servers**
- ✅ **Only runs on specified AI chat service domains**
- ✅ **Works entirely locally in your browser**

## 🌟 Support

If you find this extension helpful:
- ⭐ Star this repository
- 🐛 Report bugs
- 💡 Suggest new features
- 🔄 Share with others

## 📧 Contact

- **GitHub Issues**: [Report bugs or request features](https://github.com/deer-hunt/chat-key-changer/issues)

