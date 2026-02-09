# EntaurentQR - Quick Start Guide

## 🚀 Getting Started

### 1. Installation
```bash
cd hotel-cafe-nextjs
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Login
**Demo Credentials:**
- Email: `admin@entaurent.com`
- Password: `demo123`

---

## 📋 Main Features

### Dashboard Home (`/dashboard`)
- View key statistics
- See recent orders
- Quick access to all features

### Establishments (`/dashboard/establishments`)
- ✅ Add new restaurant/hotel/café
- ✅ View all establishments
- ✅ Edit establishment details
- ✅ Delete establishments

### Menus (`/dashboard/menus`)
- ✅ Create menus for each establishment
- ✅ Categorize menus (Food, Drinks, Desserts, Specials)
- ✅ Track menu items count
- ✅ Edit and delete menus

### QR Codes (`/dashboard/qrcodes`) ⭐
- ✅ Generate unique QR codes for each table
- ✅ Track QR code scans
- ✅ Preview QR codes
- ✅ Download/Print codes
- ✅ Manage QR status
- ✅ View QR URLs

### Orders (`/dashboard/orders`)
- ✅ Track all orders
- ✅ Update order status (Pending → Preparing → Completed)
- ✅ View order details
- ✅ Delete orders

### Staff (`/dashboard/staff`)
- ✅ Add staff members
- ✅ Assign positions and departments
- ✅ Set salaries
- ✅ Edit and remove staff

### Settings (`/dashboard/settings`)
- ✅ Update profile
- ✅ Change password
- ✅ Manage preferences

---

## 🔐 Authentication

### Pages
- **Login**: `/login`
- **Sign Up**: `/signup`
- **Forgot Password**: `/forgot-password`

### Flow
1. New user: Go to `/signup`
2. Complete onboarding wizard
3. Auto-redirect to dashboard
4. Existing user: Login at `/login`

---

## 📁 Project Structure

```
hotel-cafe-nextjs/
├── app/
│   ├── (auth)/           # Public: login, signup, forgot-password
│   ├── (dashboard)/      # Protected: main application
│   ├── components/       # Reusable components
│   ├── lib/              # Context, utilities
│   ├── styles/           # CSS files
│   └── layout.jsx        # Root layout
├── public/               # Static files
├── package.json
└── README.md
```

---

## 🎯 Key Routes

| Route | Purpose | Auth Required |
|-------|---------|---------------|
| `/` | Home (redirects based on auth) | No |
| `/login` | Login page | No |
| `/signup` | Sign up page | No |
| `/forgot-password` | Password reset | No |
| `/dashboard` | Main dashboard | Yes |
| `/dashboard/establishments` | Manage restaurants | Yes |
| `/dashboard/menus` | Manage digital menus | Yes |
| `/dashboard/qrcodes` | Manage QR codes | Yes |
| `/dashboard/orders` | Manage orders | Yes |
| `/dashboard/staff` | Manage staff | Yes |
| `/dashboard/settings` | Account settings | Yes |
| `/dashboard/onboarding` | Initial setup | Yes |

---

## 🎨 Available Actions

### Create/Add
- ➕ Add Establishment
- ➕ Create Menu
- ➕ Generate QR Code
- ➕ Add Staff Member

### View/Manage
- 👁️ Preview QR Code
- 📊 View Dashboard Stats
- 📋 View All Records

### Edit
- ✏️ Edit Establishment
- ✏️ Edit Menu
- ✏️ Update Order Status
- ✏️ Edit Staff

### Delete
- 🗑️ Delete Establishment
- 🗑️ Delete Menu
- 🗑️ Delete QR Code
- 🗑️ Remove Staff

---

## 🔧 Customization

### Add New Page
1. Create folder in `app/(dashboard)/[feature]/`
2. Create `page.jsx`
3. Add component in `components/dashboard/`
4. Update Sidebar navigation

### Change Colors
Edit `app/styles/globals.css` CSS variables:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  /* etc */
}
```

---

## 📞 Support

For detailed documentation, see [ARCHITECTURE.md](ARCHITECTURE.md)

**Need help?** Open an issue or contact support@entaurent.in

---

**Version**: 1.0.0  
**Last Updated**: Feb 2024
