# Chat w WebPage

**Transform your web reading experience with World-Class AI.**

Chat w WebPage is a powerful Chrome extension that allows you to summarize, analyze, and chat with any webpage content using your preferred AI models. Unlike other tools, we prioritize your freedom and privacy.

![Chat w WebPage Screenshot](public/images/posters/poster_abstract_6.jpeg)

## ✨ Key Features

### 🤖 Support 10+ Top-tier Models (BYOK)
Don't be locked into a single provider. We support all major AI models directly. Bring Your Own Key (BYOK) for maximum flexibility and cost control.
*   **OpenAI**: GPT-4o, o1-preview
*   **Anthropic**: Claude 3.5 Sonnet
*   **Google**: Gemini 1.5 Pro
*   **DeepSeek**: V3, R1 (Reasoning)
*   **Local Models**: Ollama, LM Studio (via local server)
*   ...and many more via Azure, Grok, OpenRouter, and SiliconFlow.

### 🔒 Privacy First Design
We built this because we value privacy.
*   **Local Storage**: Your API keys and conversation history are encrypted and stored locally in your browser (IndexedDB).
*   **Direct Connection**: Requests are sent directly from your browser to the AI provider.
*   **No Middleman**: We do not collect or store your conversation data.

### 🧠 Reasoning Visualization
Watch the AI think. Uniquely designed to visualize the step-by-step reasoning process of advanced models like **OpenAI o1** and **DeepSeek Reasoner**, helping you understand complex logic instantly.

### ⚡ Instant Productivity
*   **One-Click Summaries**: Get the gist of long articles in seconds.
*   **Smart Translation**: Auto-detect language and translate with context.
*   **Custom Personas**: Create and save your own AI assistants for coding, writing, or legal review.

## 🚀 Get Started

The extension is **free to use**. You only pay the AI providers for the models you choose to use.

[**Download for Chrome**](#) (Coming Soon)

---

## 🛠️ Website Development

This repository hosts the official website source code for Chat w WebPage.

### Directory Structure

- **`public/`**: The deployment-ready website source code.
  - `index.html`: Main landing page (English).
  - `index-zh.html`: Main landing page (Chinese).
  - `css/`, `images/`: Static assets.
- **`dev-docs/`**: Technical documentation and architecture designs.

### Deployment (Cloudflare Pages)

This project is optimized for deployment on **Cloudflare Pages**.

1. **Connect to Git**: Link this repository in Cloudflare Pages.
2. **Build Settings**:
   - **Framework preset**: `None`
   - **Build command**: (Leave empty)
   - **Build output directory**: `public`
3. **Deploy**: Save and deploy.

---
&copy; 2026 HaoBa Cloud. All rights reserved.
