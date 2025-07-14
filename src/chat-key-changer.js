/**
 * Chrome extension that swaps Enter and Shift+Enter key behavior in AI chat services
 * 
 * Supported Services:
 * ChatGPT, Claude, Canva, GitHub Copilot, Microsoft Copilot, Gemini, Poe, Genspark, Grok, Perplexity AI, DeepSeek, Notion AI
 * 
 * Usage:
 * 1. Install the extension
 * 2. Access supported sites
 * 3. Key behavior is automatically swapped in input fields
 * 
 */
class ChatKeyChanger {
    constructor() {
        this.siteConfigs = {
            'chatgpt': {
                'service': 'chatgpt',
                'domains': ['openai.com', 'chatgpt.com'],
                'inputs': ['#prompt-textarea', 'textarea[data-id="root"]', 'textarea[data-testid="textbox"]'],
                'buttons': ['button[data-testid="send-button"]', '[data-testid="fruitjuice-send-button"]', 'button[aria-label*="Send message"]', 'form button[type="submit"]'],
                'bind': 0
            },
            'claude': {
                'service': 'claude',
                'domains': ['claude.ai'],
                'inputs': ['div[contenteditable="true"]'],
                'buttons': ['div[type=button] + div button'],
                'bind': 1
            },
            'canva': {
                'service': 'canva',
                'domains': ['canva.com'],
                'inputs': ['textarea'],
                'buttons': ['button[aria-label*="Generate"]', 'button[type="submit"]', 'button:has(svg[viewBox*="send"])'],
                'bind': 0
            },
            'github': {
                'service': 'github',
                'domains': ['github.com'],
                'inputs': ['#copilot-chat-textarea'],
                'buttons': ['[class^="ChatInput-module__toolbarRight"] > button'],
                'bind': 0
            },
            'microsoftCopilot': {
                'service': 'microsoftCopilot',
                'domains': ['copilot.microsoft.com'],
                'inputs': ['textarea'],
                'buttons': ['button[data-testid="submit-button"]'],
                'bind': 0
            },
            'gemini': {
                'service': 'gemini',
                'domains': ['gemini.google.com'],
                'inputs': ['.ql-editor'],
                'buttons': ['button.submit'],
                'bind': 0
            },
            'poe': {
                'service': 'poe',
                'domains': ['poe.com'],
                'inputs': ['textarea'],
                'buttons': ['button[data-button-send="true"]'],
                'bind': 0
            },
            'genspark': {
                'service': 'genspark',
                'domains': ['genspark.ai'],
                'inputs': ['textarea'],
                'buttons': ['.enter-icon'],
                'bind': 0
            },
            'grok': {
                'service': 'grok',
                'domains': ['grok.com', 'x.ai'],
                'inputs': ['textarea'],
                'buttons': ['button[type="submit"][aria-label]'],
                'bind': 0
            },
            'perplexity': {
                'service': 'perplexity',
                'domains': ['perplexity.ai'],
                'inputs': ['div[contenteditable="true"]', 'textarea'],
                'buttons': ['[data-testid="submit-button"]'],
                'bind': 0
            },
            'deepseek': {
                'service': 'deepseek',
                'domains': ['deepseek.com'],
                'inputs': ['#chat-input'],
                'buttons': ['[type="file"] + [role="button"]'],
                'bind': 0
            },
            'notion': {
                'service': 'notion',
                'domains': ['notion.so'],
                'inputs': ['.notion-assistant-writer-ui div[contenteditable="true"]'],
                'buttons': ['.notion-assistant-writer-ui [role="button"]:has(.sendArrow)'],
                'bind': 2
            }
        };

        this.currentSite = null;
    }

    init() {
        this.setupKeySwap();
        this.setupBindRegular();
    }

    setupKeySwap() {
        const hostname = window.location.hostname;
        this.currentSite = this.detectSite(hostname);
        
        if (!this.currentSite){
            return null;
        }
        
        const selectors = this.currentSite.inputs;
        
        selectors.forEach(selector => {
            this.applyKeySwapToSelector(selector);
        });
        
        this.setupMutationObserver(selectors);
    }

    detectSite(hostname) {
        for (const config of Object.values(this.siteConfigs)) {
            if (config.domains.some(domain => hostname.includes(domain))) {
                return config;
            }
        }

        return null;
    }
    applyKeySwapToSelector(selector) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            if (!element.dataset.keyChanged) {
                this.attachKeySwapListener(element);
                element.dataset.keyChanged = '1';
            }
        });
    }

    /**
     * Set up keyboard event listener for element
     */
    attachKeySwapListener(element) {
        const el = (this.currentSite.bind & 1)?window:element;

        el.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && event.target == element && event.isTrusted) {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();

                if (event.shiftKey) {
                    this.simulateEnter(element, false);
                } else {
                    this.simulateEnter(element, true);
                }
            }
        }, true);
    }

    /**
     * Simulate Enter key press action
     */
    simulateEnter(element, addNewLine) {
        if (addNewLine) {
            if (element.tagName === 'TEXTAREA') {
                const start = element.selectionStart;
                const end = element.selectionEnd;
                const value = element.value;
                
                element.value = value.substring(0, start) + '\n' + value.substring(end);
                
                element.selectionStart = element.selectionEnd = start + 1;
                
                element.dispatchEvent(new Event('input', { bubbles: true }));
            } else if (element.contentEditable) {
                if (this.currentSite.bind & 2) {
                    const selection = window.getSelection();
                    const range = selection.getRangeAt(0);
                    const br = document.createElement('br');

                    range.insertNode(br);
                    range.setStartAfter(br);
                    range.setEndAfter(br);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }else{
                    const beforeInputEvent = new InputEvent('beforeinput', {
                        data: '',
                        inputType: 'insertText',
                        bubbles: true,
                        cancelable: true
                    });
                    element.dispatchEvent(beforeInputEvent);

                    const event = new KeyboardEvent('keydown', {
                        key: 'Enter',
                        code: 'Enter',
                        keyCode: 13,
                        which: 13,
                        bubbles: true,
                        cancelable: true,
                        shiftKey: true
                    });
                    element.dispatchEvent(event);
                }

                element.dispatchEvent(new Event('input', { bubbles: true }));
            }
        } else {
            this.simulateSendAction(element);
        }
    }

    /**
     * Execute send action by clicking send button
     */
    simulateSendAction(element) {
        const sendButtonSelectors = this.getSendButtonSelectors(this.currentSite);
        
        if (!sendButtonSelectors) {
            this.dispatchOriginalEnterEvent(element);
            return;
        }

        for (const selector of sendButtonSelectors) {
            const sendButton = document.querySelector(selector);
            if (sendButton && !sendButton.disabled && this.isButtonVisible(sendButton)) {
                sendButton.click();
                return;
            }
        }

        this.dispatchOriginalEnterEvent(element);
    }

    getSendButtonSelectors(siteConfig) {
        return siteConfig?.buttons || null;
    }

    isButtonVisible(button) {
        const style = window.getComputedStyle(button);
        return style.display !== 'none' && 
               style.visibility !== 'hidden' && 
               style.opacity !== '0' &&
               button.offsetWidth > 0 && 
               button.offsetHeight > 0;
    }

    /**
     * Re-fire original Enter key event
     */
    dispatchOriginalEnterEvent(element, shiftKey=false) {
        const originalEvent = new KeyboardEvent('keydown', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            which: 13,
            bubbles: true,
            cancelable: true,
            shiftKey: shiftKey
        });

        element.dispatchEvent(originalEvent);
    }

    /**
     * Set up DOM change monitoring
     */
    setupMutationObserver(selectors) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            selectors.forEach(selector => {
                                if (node.matches && node.matches(selector)) {
                                    this.applyKeySwapToSelector(selector);
                                }

                                const childElements = node.querySelectorAll && node.querySelectorAll(selector);
                                if (childElements && childElements.length > 0) {
                                    this.applyKeySwapToSelector(selector);
                                }
                            });
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    /**
     * Set up periodic element checking process
     */
    setupBindRegular() {
        setInterval(() => {
            if (this.currentSite) {
                const selectors = this.currentSite.inputs;

                selectors.forEach(selector => {
                    this.applyKeySwapToSelector(selector);
                });
            }
        }, 250);
    }
}


window.addEventListener('load', function() {
    const app = new ChatKeyChanger();
    app.init();
});
