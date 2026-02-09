# Hotel & Café Management System - Next.js + React

A modern, fully functional Hotel and Café Management System built with **Next.js 14** and **React 18**.

## 🚀 Features

✅ **Dashboard** - Real-time statistics and order overview
✅ **Establishments Management** - Add, edit, and manage hotels, cafés, and restaurants
✅ **Menu Management** - Create and organize menus by category
✅ **Staff Management** - Manage employees, positions, and salaries
✅ **QR Code Management** - Generate and track QR codes for tables
✅ **Orders Tracking** - Monitor orders and update statuses
✅ **Settings** - User configuration and system preferences
✅ **Responsive Design** - Works seamlessly on desktop and mobile
✅ **State Management** - Context API for global state management
✅ **Modal Forms** - Beautiful modal dialogs for data input

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: CSS3 with CSS Variables
- **State Management**: React Context API
- **No External Dependencies**: Works with just React and Next.js

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Setup

1. Navigate to the project directory:
```bash
cd hotel-cafe-nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:3000
```

## 📁 Project Structure

```
hotel-cafe-nextjs/
├── app/
│   ├── components/           # React components
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Establishments.jsx
│   │   ├── Menus.jsx
│   │   ├── Staff.jsx
│   │   ├── QRCodes.jsx
│   │   ├── Orders.jsx
│   │   ├── Settings.jsx
│   │   ├── Modal.jsx
│   │   └── AlertContainer.jsx
│   ├── styles/               # Global CSS
│   │   └── globals.css
│   ├── lib/                  # Utilities and context
│   │   └── context.jsx       # AppContext for state management
│   ├── api/                  # API routes (optional)
│   ├── layout.jsx            # Root layout
│   ├── page.jsx              # Home page
│   ├── establishments/
│   │   └── page.jsx
│   ├── menus/
│   │   └── page.jsx
│   ├── staff/
│   │   └── page.jsx
│   ├── qrcodes/
│   │   └── page.jsx
│   ├── orders/
│   │   └── page.jsx
│   └── settings/
│       └── page.jsx
├── public/                   # Static assets
├── package.json
├── tsconfig.json
├── next.config.js
└── .gitignore
```

## 🎯 Usage

### Navigation
- Use the sidebar to navigate between different sections
- Click on each menu item to view the respective page
- The active page is highlighted in the sidebar

### Adding Data
- Click the "Add New" button in each section
- Fill in the form and submit
- Data is stored in React Context (in-memory)

### Deleting Data
- Click the "Delete" button on any item
- Confirm the action in the dialog
- The item will be removed immediately

### Updating Orders
- Click "Update" on any order in the Orders page
- The status cycles through: Pending → Preparing → Completed

## 🎨 Customization

### Change Colors
Edit the CSS variables in `app/styles/globals.css`:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  /* ... more variables */
}
```

### Modify Data
Edit the initial state in `app/lib/context.jsx` to add or remove default data.

### Add New Pages
1. Create a new component in `app/components/`
2. Create a new route in `app/[route]/page.jsx`
3. Add navigation link in `Sidebar.jsx`

## 📝 Available Scripts

```bash
# Development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 🔄 Data Persistence

Currently, all data is stored in **React Context (in-memory)**, which means:
- ✅ Data persists during the session
- ❌ Data resets when the page is refreshed

### To Add Persistence:
1. Use **localStorage** for browser-based persistence
2. Connect to a **backend API** (Node.js, Python, etc.)
3. Use a database like **MongoDB**, **PostgreSQL**, or **Firebase**

## 🚀 Deployment

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

### Deploy to Other Platforms
- **Netlify**: Build command `npm run build`, Output directory `.next`
- **AWS**: Use Next.js deployment options
- **Docker**: Create a Dockerfile with Node.js base image

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [CSS Guide](https://developer.mozilla.org/en-US/docs/Web/CSS)

## 📞 Support

For issues or questions, please check the documentation or create an issue in the repository.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

**Built with ❤️ using Next.js and React**
