# 🏛️ Furnovskyland Official Website 🌐

[![Status: Active](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)](STATUS)
[![Framework: Eleventy](https://img.shields.io/badge/Framework-Eleventy-red?style=for-the-badge)](https://www.11ty.dev/)

Welcome to the official repository for the **Empire of Furnovskyland's Commonwealth** website! This is an open-source, statically generated site built with [Eleventy (11ty)](https://www.11ty.dev/) and vanilla CSS/JS.

## 🚀 How to Run the Site Locally

If you'd like to contribute, test features, or just run the site on your own machine, follow these steps:

### Prerequisites
Make sure you have **Node.js** or **Bun** installed on your system.

### 1. Install Dependencies
Clone the repository and install the required packages:
```bash
bun install
# or npm install
```

### 2. Start the Development Server
Run the local server with live-reloading enabled. This will start an Eleventy server at `http://localhost:8080`:
```bash
bun run start
# or npm start
```

### 3. Build for Production
To generate the final static files in the `docs/` folder (for production deployment):
```bash
bun run build
# or npm run build
```

---

## 🔌 API Access & Backend

The website relies on dynamic data (such as Discord server statistics, Minecraft server status, etc.) which is fetched via REST APIs.

### How to Access the API
Currently, the site uses standard open APIs where possible (like `mcsrvstat.us` or Discord's Widget JSON API). 

If you need to query custom endpoints, build a new tool, or need advanced data from Furnovskyland's core systems:
- **You will need to create your own backend API** or
- **Contact the Leader of Furnovskyland** for official access credentials or to get a custom endpoint added to the official `api.furnovskyland.hu` (or equivalent) service.

---

## 🔧 Technical Overview

- **Static Site Generator:** Eleventy (`@11ty/eleventy`)
- **Styling:** Vanilla CSS (`src/CSS/style.css`)
- **Logic:** Vanilla JavaScript (`src/JS/script.js`)
- **Hosting:** Configured for seamless deployment on Vercel (`vercel.json`) or GitHub Pages.

## 🧑‍💻 Devs & Contributors

* [CsPS](https://github.com/CsPS0)
* [Furnovsky](https://github.com/Furnovsky963)

Interested in contributing to Furnovskyland's digital infrastructure? Open a Pull Request or create an Issue on GitHub!
