# 🏛️ Furnovskyland: A Sovereign Political Community 🌐

[![Political Status](https://img.shields.io/badge/Status-Sovereign%20State-darkgreen?style=for-the-badge)](STATUS)
[![Government Type](https://img.shields.io/badge/Government-Imperial%20Senate-purple?style=for-the-badge)](GOVERNMENT)
[![Constitution](https://img.shields.io/badge/Constitution-Ratified-blue?style=for-the-badge)](CONSTITUTION)

## 🌍 About Furnovskyland

Furnovskyland is a unique sovereign political entity, characterized by its rich cultural heritage, robust political institutions, and distinctive governance model. Our community is founded on principles of democratic imperialism, blending traditional imperial structures with modern collaborative governance.

## 🏆 Current Leadership Hierarchy

| Name | Highest Role(s) | Department |
|------|------|-------------------------|
| HM Furnovsky I | Emperor of the Commonwealth | Head of State |
| HRH Crown Prince Daniel | Crown Prince of the Commonwealth, Duke | Moderation |
| HRH Prince Matthew | Prince of the Commonwealth, Duke | Moderation |
| HRH Prince Daniel (Rupitu) | Prince of the Commonwealth, Duke | Moderation |
| HRH Shogenki | Fourth Palatine of the Commonwealth | Moderation |
| XVDX | Prime Minister of the Government | Executive |
| Hafiz bin Najmuldin | Deputy Prime Minister of the Government | Executive |
| Seneca | Deputy Prime Minister of the Government | Executive |
| Edgeworth | Senator | Legislative |
| Jole | Deputy Senator | Legislative |
.
.
.

## 🌐 Website Sections and Functionality

### 1. 📜 Constitutional Portal
- Full text of the Furnovskyland Constitution
- Historical amendments
- Citizen rights and obligations
- Interactive constitutional timeline

### 2. 🗳️ Senate Chamber
- Live legislative updates
- Voting records
- Public policy proposals
- Senator profiles and contact information

### 3. 🌍 Diplomatic Network
- International relations dashboard
- Treaty archives
- Bilateral and multilateral engagement reports
- Diplomatic mission information

### 4. 💼 Economic Dashboard
- National economic indicators
- Trade statistics
- Investment opportunities
- Fiscal policy transparency reports

### 5. 🏛️ Governance Resources
- Official government documents
- Public service directories
- Citizen engagement platforms
- Governmental communication channels

## 🔧 Technical Implementation

### Frontend Technologies
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🔧 Development

To install dependencies, run:
```bash
npm install
```

To start the development server with live reloading, run:
```bash
npm start
```

To build the CSS for production, run:
```bash
npm run build:css
```

## 🖼️ Preview

<div align="center">
  <img src="/docs/IMG/preview.png" alt="Website Preview">
</div>

## 📝 License

This project and all its contents are protected under the Furnovskyland State Intellectual Property Statute.

## 🧑‍💻 Devs

* [CsPS](https://github.com/CsPS0)
* [Furnovsky](https://github.com/Furnovsky963)

Interested in contributing to Furnovskyland's digital infrastructure? Check our citizen engagement guidelines and submission protocols.

---

<div align="center">
<a href="#top">🔝 Return to Top</a>
</div>

## 🤖 Discord Population Tracker Setup

To display the live Discord server population on the homepage, a small Node.js backend server is required.

### Backend Setup

1.  **Navigate to the `backend` directory:**
    ```bash
    cd backend
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Configure Bot Token and Server ID:**
    Open `server.js` in the `backend` directory and replace `'YOUR_BOT_TOKEN'` and `'YOUR_SERVER_ID'` with your actual Discord bot token and server ID.
    *   **Bot Token:** Obtain this from the [Discord Developer Portal](https://discord.com/developers/applications) after creating a bot.
    *   **Server ID (Guild ID):** Right-click on your server icon in Discord and select "Copy Server ID" (Developer Mode might need to be enabled in Discord settings: User Settings > Advanced > Developer Mode).
4.  **Start the Backend Server:**
    ```bash
    npm start
    ```
    This will start the server on `http://localhost:3000`.

### Frontend Integration

The `docs/index.html` file has already been updated to fetch data from `http://localhost:3000/api/discord-stats` and display it in the "Population" section. Ensure your backend server is running for the population count to update correctly on the website.
