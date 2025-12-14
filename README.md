# 🎁 GiftLink - Gift Discovery Platform

A modern full-stack web application for discovering and browsing curated gifts.

## ✨ Features

- 🔐 **User Authentication** - Register & Login
- 🎁 **Gift Browsing** - 20+ curated gifts with images
- 🔍 **Advanced Search** - Filter by category, name, price
- 📱 **Responsive Design** - Works on all devices
- 🖼️ **Beautiful Images** - High-quality product photos

## 🛠️ Tech Stack

**Frontend:**
- React 18
- React Router
- Axios
- CSS3

**Backend:**
- Node.js
- Express.js
- JWT Authentication
- bcryptjs

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/giftlink.git
cd giftlink
```

2. **Install Backend Dependencies**
```bash
cd giftlink-backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../giftlink-frontend
npm install
```

4. **Start Backend**
```bash
cd giftlink-backend
node simple-server.js
```

5. **Start Frontend**
```bash
cd giftlink-frontend
npm start
```

6. **Open Browser**
Visit: http://localhost:3000

## 🌐 Live Demo

- **Frontend:** https://giftlink.vercel.app
- **Backend:** https://giftlink-backend.railway.app

## 📁 Project Structure

```
giftlink/
├── giftlink-backend/          # Node.js API
│   ├── simple-server.js       # Main server file
│   ├── routes/               # API routes
│   └── package.json
├── giftlink-frontend/         # React app
│   ├── src/
│   │   ├── components/       # React components
│   │   └── context/         # Auth context
│   └── package.json
└── README.md
```

## 🎯 Available Gift Categories

- Electronics (5 items)
- Food & Beverage (4 items)
- Home & Garden (4 items)
- Beauty (2 items)
- Fashion, Books, Sports & Fitness

## 🔧 Environment Variables

**Backend (.env):**
```
PORT=5001
NODE_ENV=development
JWT_SECRET=your_secret_key
```

**Frontend (.env):**
```
REACT_APP_API_URL=http://localhost:5001
```

## 🚀 Deployment

### Backend (Railway)
1. Connect GitHub repo
2. Deploy `giftlink-backend` folder
3. Set environment variables

### Frontend (Vercel)
1. Connect GitHub repo
2. Deploy `giftlink-frontend` folder
3. Set `REACT_APP_API_URL` to your backend URL

## 📝 License

MIT License - feel free to use this project!

## 👨‍💻 Author

Created with ❤️ by [Your Name]