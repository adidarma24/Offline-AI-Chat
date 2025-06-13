````markdown
# Offline AI Chat

This is a simple, locally-run AI chat application that uses **Ollama** to function entirely offline. The user interface is built with **React, TypeScript, and Vite**, and it uses **Shadcn UI** for its components. All chat data, including messages and threads, is stored locally in your browser using **Dexie.js**.

## ✨ Features

- **100% Offline**: Runs entirely on your local machine without needing an internet connection.
- **Local AI**: Powered by Ollama, allowing you to use various open-source language models.
- **Persistent Chat History**: Chat threads and messages are saved locally in your browser's IndexedDB using Dexie.js.
- **Multiple Chat Threads**: Create, manage, and switch between different chat conversations.
- **Real-time Streaming**: Watch the AI's responses and thoughts stream in real-time as they are generated.
- **"Thought" Process Visibility**: See the AI's reasoning or "thoughts" before it formulates a final response, providing insight into its process.
- **Light & Dark Mode**: Toggle between light and dark themes to suit your preference.
- **Responsive Design**: A responsive interface with a collapsible sidebar that works on both desktop and mobile devices.

## 🚀 Tech Stack

- **Framework**: React
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI, Radix UI
- **Local Database**: Dexie.js (IndexedDB wrapper)
- **Local LLM Provider**: Ollama
- **Routing**: React Router
- **Linting**: ESLint

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [Ollama](https://ollama.com/)

## ⚙️ Installation & Setup

Follow these steps to get the project up and running on your local machine.

### 1. Install Ollama

First, download and install Ollama for your operating system from the official website.

- **[Download Ollama](https://ollama.com/download)**

After installation, ensure the Ollama application is running in the background.

### 2. Download the AI Model

Next, you need to pull the AI model that the application will use. This project is configured to use `deepseek-r1:1.5b`. Open your terminal and run the following command:

```bash
ollama pull deepseek-r1:1.5b
```
````

> **Note**: You can use other models from the [Ollama Library](https://ollama.com/library). If you choose a different model, make sure to update the `model` name in `src/pages/ChatPage.tsx`.

### 3\. Clone the Repository

Clone this repository to your local machine.

```bash
git clone <YOUR_REPOSITORY_URL>
cd offline-ai-chat
```

### 4\. Install Dependencies

Navigate to the project's root directory in your terminal and install the required npm packages.

```bash
npm install
```

### 5\. Run the Application

Once the dependencies are installed, you can start the local development server.

```bash
npm run dev
```

The application should now be running and accessible in your web browser, typically at `http://localhost:5173`.

---

## 📜 Available Scripts

This project includes the following scripts defined in `package.json`:

- `npm run dev`: Starts the Vite development server with Hot Module Replacement (HMR) enabled.
- `npm run build`: Compiles the TypeScript code and builds the application for production. The output will be in the `dist` folder.
- `npm run lint`: Runs ESLint to analyze the code for potential errors and style issues.
- `npm run preview`: Starts a local server to preview the production build from the `dist` directory.

## 📁 Project Structure

Here is a brief overview of the key files and directories in the project:

```
.
├── src
│   ├── components    # Reusable UI components
│   │   ├── ui        # Unstyled components from Shadcn UI
│   │   ├── ChatMessage.tsx
│   │   ├── ChatSidebar.tsx
│   │   └── ThemeProvider.tsx
│   ├── hooks         # Custom React hooks
│   ├── lib           # Utility functions and library configurations
│   │   ├── dexie.ts  # Dexie.js database schema and functions
│   │   └── utils.ts
│   ├── pages         # Route components
│   │   └── ChatPage.tsx # Main chat interface
│   └── App.tsx       # Main application component with routing setup
├── tailwind.config.js # Tailwind CSS configuration
├── vite.config.ts     # Vite configuration
└── package.json       # Project dependencies and scripts
```

```

```
