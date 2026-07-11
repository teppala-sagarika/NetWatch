# 🚀 NetWatch

A full-stack Real-Time Service & Website Monitoring Platform that helps track device availability, latency, alerts, and network health from a centralized interface.

## 🌐 Live Demo

Frontend: https://net-watch-two.vercel.app

Backend API: https://netwatch-api-vquy.onrender.com

## ✨ Features

* Monitor device availability and status
* Track network latency in real time
* Generate alerts for offline devices and high latency
* View historical monitoring logs
* Analytics dashboard with charts and visualizations
* Device health score calculation
* Export reports as PDF
* Export monitoring data as CSV
* Cloud-hosted using Vercel, Render, and MongoDB Atlas

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Axios
* Recharts
* Socket.IO Client

### Backend

* Node.js
* Express.js
* Socket.IO

### Database

* MongoDB Atlas
* Mongoose

### Deployment

* Vercel
* Render

## 📂 Project Structure

```bash
NetWatch/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── server.js
│
└── README.md
```

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/teppala-sagarika/NetWatch.git
cd NetWatch
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🔐 Environment Variables

### Backend (.env)

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## 📈 Key Highlights

* Real-time device monitoring
* Alert management system
* Historical analytics and reporting
* PDF and CSV report exports
* Full-stack architecture
* Cloud deployment with MongoDB Atlas

## 👩‍💻 Author

**Teppala Sagarika**


Built to demonstrate full-stack development, monitoring systems, cloud deployment, analytics, and real-time applications.
