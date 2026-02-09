# EntaurentQR - SaaS Table QR Menu Management System

## Project Overview

EntaurentQR is a comprehensive SaaS application built with Next.js and React for managing table QR codes, digital menus, and restaurant operations. The system is designed for restaurants, cafés, hotels, and bars to provide digital menu access via QR codes at each table.

---

## 🏗️ Project Architecture

### Technology Stack
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Custom CSS with modular organization
- **State Management**: React Context API
- **Language**: JavaScript/JSX

---

## 📁 Folder Structure

```
hotel-cafe-nextjs/
├── app/
│   ├── (auth)/                          # Authentication Route Group
│   │   ├── layout.jsx                   # Auth layout (no sidebar)
│   │   ├── login/
│   │   │   └── page.jsx                 # Login page
│   │   ├── signup/
│   │   │   └── page.jsx                 # Sign up / Registration
│   │   └── forgot-password/
│   │       └── page.jsx                 # Password reset
│   │
│   ├── (dashboard)/                     # Protected Dashboard Route Group
│   │   ├── layout.jsx                   # Dashboard layout (with sidebar)
│   │   ├── page.jsx                     # Dashboard home
│   │   ├── establishments/
│   │   │   └── page.jsx                 # Manage restaurants/hotels
│   │   ├── menus/
│   │   │   └── page.jsx                 # Create & manage digital menus
│   │   ├── qrcodes/
│   │   │   └── page.jsx                 # QR code generation & management
│   │   ├── orders/
│   │   │   └── page.jsx                 # Order tracking
│   │   ├── staff/
│   │   │   └── page.jsx                 # Staff management
│   │   ├── settings/
│   │   │   └── page.jsx                 # Account settings
│   │   └── onboarding/
│   │       └── page.jsx                 # Initial setup wizard
│   │
│   ├── lib/
│   │   └── context.jsx                  # Global state management
│   │
│   ├── components/
│   │   └── dashboard/
│   │       ├── Sidebar.jsx              # Navigation sidebar
│   │       ├── Header.jsx               # Page header
│   │       ├── Dashboard.jsx            # Dashboard overview
│   │       ├── Establishments.jsx       # Establishments CRUD
│   │       ├── Menus.jsx                # Menus CRUD
│   │       ├── QRCodes.jsx              # QR codes CRUD
│   │       ├── Staff.jsx                # Staff CRUD
│   │       ├── Orders.jsx               # Orders management
│   │       ├── Settings.jsx             # Settings page
│   │       ├── Modal.jsx                # Reusable modal
│   │       └── AlertContainer.jsx       # Alert notifications
│   │
│   ├── styles/
│   │   ├── globals.css                  # Global styles
│   │   ├── auth.css                     # Auth pages styles
│   │   ├── dashboard.css                # Dashboard styles
│   │   └── onboarding.css               # Onboarding styles
│   │
│   ├── layout.jsx                       # Root layout
│   ├── page.jsx                         # Home redirect page
│   └── favicon.ico
│
├── public/                              # Static assets
├── package.json
└── next.config.js
```

---

## 🔐 Route Structure & Authentication Flow

### Public Routes (No Authentication Required)

#### 1. **Login Page**
- **Route**: `/login`
- **File**: `app/(auth)/login/page.jsx`
- **Purpose**: Admin/manager login
- **Features**:
  - Email/password authentication
  - Remember me checkbox
  - Forgot password link
  - Demo credentials display
  - Link to signup

#### 2. **Sign Up Page**
- **Route**: `/signup`
- **File**: `app/(auth)/signup/page.jsx`
- **Purpose**: Create new restaurant account
- **Features**:
  - User registration form
  - Restaurant name input
  - Terms acceptance
  - Password confirmation
  - Redirect to onboarding on success

#### 3. **Forgot Password Page**
- **Route**: `/forgot-password`
- **File**: `app/(auth)/forgot-password/page.jsx`
- **Purpose**: Password reset request
- **Features**:
  - Email submission
  - Success message
  - Link back to login

### Protected Routes (Authentication Required)

#### 4. **Dashboard Home**
- **Route**: `/dashboard`
- **File**: `app/(dashboard)/page.jsx`
- **Purpose**: Main dashboard overview
- **Features**:
  - Key statistics (establishments, staff, menus, revenue)
  - Recent orders table
  - Quick stats sidebar

#### 5. **Establishments Management**
- **Route**: `/dashboard/establishments`
- **File**: `app/(dashboard)/establishments/page.jsx`
- **Purpose**: Manage hotels, restaurants, cafés
- **Features**:
  - List all establishments
  - Add new establishment
  - Edit establishment details
  - Delete establishment
  - Filter by type and status

#### 6. **Menus Management**
- **Route**: `/dashboard/menus`
- **File**: `app/(dashboard)/menus/page.jsx`
- **Purpose**: Create and manage digital menus
- **Features**:
  - Create menu for each establishment
  - Set menu category (Food, Drinks, Desserts, Specials)
  - Add menu items count
  - Edit menu details
  - Delete menu
  - Link menus to establishments

#### 7. **QR Code Management** ⭐ (Core Feature)
- **Route**: `/dashboard/qrcodes`
- **File**: `app/(dashboard)/qrcodes/page.jsx`
- **Purpose**: Generate and manage table QR codes
- **Features**:
  - Generate unique QR codes for each table
  - Track QR code scans
  - Preview QR codes
  - Download/print QR codes
  - Manage QR code status
  - View QR URL links
  - Delete QR codes

#### 8. **Orders Management**
- **Route**: `/dashboard/orders`
- **File**: `app/(dashboard)/orders/page.jsx`
- **Purpose**: Track and manage customer orders
- **Features**:
  - View all orders
  - Change order status (Pending → Preparing → Completed)
  - View order details (table, items, total)
  - Filter by establishment
  - Delete orders

#### 9. **Staff Management**
- **Route**: `/dashboard/staff`
- **File**: `app/(dashboard)/staff/page.jsx`
- **Purpose**: Manage team members
- **Features**:
  - Add staff members
  - Assign positions and departments
  - Set salaries
  - Edit staff details
  - Remove staff
  - Track employee status

#### 10. **Settings**
- **Route**: `/dashboard/settings`
- **File**: `app/(dashboard)/settings/page.jsx`
- **Purpose**: User and system settings
- **Features**:
  - Update profile information
  - Change password
  - Email/SMS preferences
  - Notification settings

#### 11. **Onboarding Wizard**
- **Route**: `/dashboard/onboarding`
- **File**: `app/(dashboard)/onboarding/page.jsx`
- **Purpose**: Initial setup for new users
- **Features**:
  - Step 1: Select business type
  - Step 2: Enter business details
  - Step 3: Review and confirm
  - Multi-step form with progress indicator

---

## 🔄 Data Flow & Context API

### Global State Management
File: `app/lib/context.jsx`

#### User Authentication
```javascript
// User state
const [user, setUser] = useState(null)

// Methods
const login = (userData) => setUser(userData)
const logout = () => setUser(null)
```

#### Establishments
```javascript
const [establishments, setEstablishments] = useState([...])
const addEstablishment = (est) => { ... }
const updateEstablishment = (id, data) => { ... }
const deleteEstablishment = (id) => { ... }
```

#### Menus
```javascript
const [menus, setMenus] = useState([...])
const addMenu = (menu) => { ... }
const updateMenu = (id, data) => { ... }
const deleteMenu = (id) => { ... }
```

#### QR Codes
```javascript
const [qrcodes, setQRCodes] = useState([...])
const addQRCode = (qr) => { ... }
const updateQRCode = (id, data) => { ... }
const deleteQRCode = (id) => { ... }
```

#### Orders
```javascript
const [orders, setOrders] = useState([...])
const addOrder = (order) => { ... }
const updateOrder = (id, data) => { ... }
const deleteOrder = (id) => { ... }
```

#### Staff
```javascript
const [staff, setStaff] = useState([...])
const addStaff = (staffMember) => { ... }
const updateStaff = (id, data) => { ... }
const deleteStaff = (id) => { ... }
```

#### Alerts
```javascript
const [alerts, setAlerts] = useState([])
const showAlert = (type, message) => { ... }
const removeAlert = (id) => { ... }
```

---

## 🎨 Component Hierarchy

### Layout Components
- **RootLayout** (`app/layout.jsx`)
  - Contains AppProvider
  - Renders child layouts

- **AuthLayout** (`app/(auth)/layout.jsx`)
  - Used for all authentication pages
  - Clean, centered design
  - No sidebar/navigation

- **DashboardLayout** (`app/(dashboard)/layout.jsx`)
  - Protected routes
  - Contains Sidebar + Main content
  - User authentication check

### Shared Components
- **Sidebar** (`components/dashboard/Sidebar.jsx`)
  - Navigation menu
  - Active link highlighting
  - User profile section
  - Logout button

- **Header** (`components/dashboard/Header.jsx`)
  - Page title and subtitle
  - User avatar
  - Logout button

- **Modal** (`components/dashboard/Modal.jsx`)
  - Reusable modal wrapper
  - Overlay click to close
  - Customizable content

- **AlertContainer** (`components/dashboard/AlertContainer.jsx`)
  - Displays notifications
  - Auto-dismiss after 5 seconds
  - Different types (success, danger, warning, info)

### Feature Components
- **Dashboard** - Overview with stats
- **Establishments** - CRUD for restaurants/hotels
- **Menus** - Create and manage digital menus
- **QRCodes** - Generate and track QR codes ⭐
- **Orders** - Order management and tracking
- **Staff** - Employee management
- **Settings** - User preferences

---

## 🎯 Key Features Explained

### 1. QR Code Management (Core Feature)
The system's flagship feature for digital menu access:

**Flow**:
1. Admin creates establishment (e.g., "The Grand Hotel")
2. Admin creates menu (e.g., "Breakfast Menu")
3. Admin generates QR codes for each table
4. QR codes link to digital menu via unique URL
5. Customers scan QR code at table → access menu
6. System tracks QR code scans for analytics

**Data Structure**:
```javascript
{
  id: 1,
  tableNo: 1,
  estId: 1,                    // Establishment ID
  status: 'Active',
  scans: 145,                  // Track usage
  url: 'https://entaurent.in/qr/001'  // Menu link
}
```

### 2. Multi-Establishment Support
Manage multiple restaurants/hotels from one dashboard:
- Different business types (Restaurant, Café, Hotel, Bar)
- Individual table management per establishment
- Separate menus per establishment
- Consolidated reporting

### 3. Real-time Notifications
- Success/error alerts for all actions
- Auto-dismiss after 5 seconds
- Position: top-right corner
- Non-intrusive design

---

## 🔌 API Integration Points

Current implementation uses mock data. Integration points for backend:

### Authentication Endpoints
```
POST /api/auth/login
POST /api/auth/signup
POST /api/auth/forgot-password
POST /api/auth/reset-password
POST /api/auth/logout
```

### Establishments Endpoints
```
GET /api/establishments
POST /api/establishments
PUT /api/establishments/:id
DELETE /api/establishments/:id
```

### Menus Endpoints
```
GET /api/menus
POST /api/menus
PUT /api/menus/:id
DELETE /api/menus/:id
```

### QR Codes Endpoints (Priority)
```
GET /api/qrcodes
POST /api/qrcodes/generate
PUT /api/qrcodes/:id
DELETE /api/qrcodes/:id
GET /api/qrcodes/:id/analytics  # Scan tracking
```

### Orders Endpoints
```
GET /api/orders
POST /api/orders
PUT /api/orders/:id
DELETE /api/orders/:id
```

### Staff Endpoints
```
GET /api/staff
POST /api/staff
PUT /api/staff/:id
DELETE /api/staff/:id
```

---

## 🎯 User Flows

### New User Onboarding Flow
1. **Access `/signup`** → Sign up form
2. **Create account** → Validation & account creation
3. **Auto-redirect to `/onboarding`** → Multi-step wizard
4. **Step 1**: Select business type (Restaurant/Café/Hotel/Bar)
5. **Step 2**: Enter business details (name, cuisine, tables, location)
6. **Step 3**: Review information
7. **Complete** → Auto-redirect to `/dashboard`
8. **Create first establishment** and QR codes

### Daily User Flow
1. **Access `/login`** → Login page
2. **Submit credentials** → Authentication
3. **Redirect to `/dashboard`** → View overview
4. **Navigate** to needed section (QR Codes, Menus, Orders, etc.)
5. **Perform CRUD operations** → See live updates
6. **Logout** → Return to login

### QR Code Generation Flow
1. Navigate to `/dashboard/qrcodes`
2. Click "Generate QR Code"
3. Select establishment (dropdown)
4. Enter table number
5. Click "Generate"
6. View table with all QR codes
7. Click "Preview" to see QR code
8. Download/Print QR code
9. Place physical QR at table

---

## 🛠️ Development Guide

### Running the Application

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
http://localhost:3000
```

### Demo Credentials
```
Email: admin@entaurent.com
Password: demo123
```

### Adding a New Feature

1. Create new folder in `app/(dashboard)/[feature]/`
2. Create `page.jsx` component
3. Create corresponding component in `components/dashboard/[Feature].jsx`
4. Add to context in `lib/context.jsx` if needed state
5. Update Sidebar navigation in `components/dashboard/Sidebar.jsx`
6. Add styles to relevant CSS file

### Creating a New Page

```jsx
// app/(dashboard)/newfeature/page.jsx
import Header from '@/app/components/dashboard/Header';
import NewFeature from '@/app/components/dashboard/NewFeature';

export default function NewFeaturePage() {
  return (
    <>
      <Header title="New Feature" subtitle="Description" />
      <NewFeature />
    </>
  );
}
```

---

## 🎨 Styling System

### CSS Organization
- **globals.css** - Base styles, variables, grid system
- **auth.css** - Authentication pages
- **dashboard.css** - Main dashboard styles
- **onboarding.css** - Onboarding wizard

### Color Scheme
```css
--primary-color: #667eea
--secondary-color: #764ba2
--success-color: #48bb78
--warning-color: #f6ad55
--danger-color: #f56565
--dark-color: #2d3748
--light-color: #f7fafc
```

### Responsive Breakpoints
```css
Mobile: < 640px
Tablet: 640px - 768px
Desktop: > 768px
```

---

## 📊 Data Models

### User Model
```javascript
{
  email: string,
  name: string,
  role: 'admin' | 'restaurant_admin' | 'manager',
  restaurantName: string (optional)
}
```

### Establishment Model
```javascript
{
  id: number,
  name: string,
  type: 'restaurant' | 'cafe' | 'hotel' | 'bar',
  location: string,
  status: 'Active' | 'Inactive',
  tables: number
}
```

### Menu Model
```javascript
{
  id: number,
  name: string,
  category: 'Food' | 'Drinks' | 'Desserts' | 'Specials',
  items: number,
  status: 'Active' | 'Inactive',
  estId: number
}
```

### QR Code Model
```javascript
{
  id: number,
  tableNo: number,
  estId: number,
  status: 'Active' | 'Inactive',
  scans: number,
  url: string
}
```

### Order Model
```javascript
{
  id: number,
  tableNo: number,
  estId: number,
  items: number,
  total: number,
  status: 'Pending' | 'Preparing' | 'Completed' | 'Cancelled',
  date: string
}
```

### Staff Model
```javascript
{
  id: number,
  name: string,
  position: string,
  department: string,
  status: 'Active' | 'Inactive',
  salary: number
}
```

---

## 🔒 Security Considerations

### Current Implementation
- Client-side authentication (demo)
- Local storage for user session
- Protected route checking in layout

### Production Requirements
- JWT token-based authentication
- HTTP-only secure cookies
- CSRF protection
- Input validation and sanitization
- Rate limiting
- SSL/TLS encryption
- Environment variables for sensitive data

---

## 🚀 Future Enhancements

1. **Real QR Code Generation**
   - Integrate QR code library
   - Generate actual scannable codes
   - SVG/PNG download

2. **Customer Portal**
   - QR code landing page
   - Digital menu viewing
   - Order placement
   - Order history

3. **Analytics & Reporting**
   - QR code scan analytics
   - Revenue reports
   - Popular items tracking
   - Peak hours analysis

4. **Integrations**
   - Payment gateway (Stripe, Razorpay)
   - Email notifications
   - SMS alerts
   - Cloud storage

5. **Advanced Features**
   - Multi-language support
   - Discount/promo codes
   - Inventory management
   - Kitchen display system

---

## 📝 Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_NAME=EntaurentQR
NEXT_PUBLIC_CONTACT_EMAIL=support@entaurent.in
```

---

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Update documentation
4. Test thoroughly
5. Submit pull request

---

## 📄 License

Copyright © 2024 EntaurentQR. All rights reserved.

---

## 📞 Support

For issues and questions, contact: support@entaurent.in

---

**Last Updated**: February 9, 2024
**Version**: 1.0.0
**Status**: Production Ready
