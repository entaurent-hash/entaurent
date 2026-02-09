// ========================================
// APP STATE & INITIALIZATION
// ========================================

const app = {
    currentUser: {
        id: 1,
        name: 'Admin User',
        email: 'admin@hotelcafe.com',
        role: 'Admin'
    },
    currentPage: 'dashboard',
    
    // Sample data
    establishments: [
        { id: 1, name: 'The Grand Hotel', type: 'Hotel', location: 'Downtown', status: 'Active', tables: 45 },
        { id: 2, name: 'Coffee Lounge', type: 'Café', location: 'Main Street', status: 'Active', tables: 20 },
        { id: 3, name: 'Sunset Restaurant', type: 'Restaurant', location: 'Beachside', status: 'Active', tables: 60 }
    ],
    
    menus: [
        { id: 1, name: 'Breakfast Menu', category: 'Food', items: 25, status: 'Active', estId: 1 },
        { id: 2, name: 'Beverages', category: 'Drinks', items: 15, status: 'Active', estId: 2 },
        { id: 3, name: 'Dinner Special', category: 'Food', items: 40, status: 'Active', estId: 3 }
    ],
    
    staff: [
        { id: 1, name: 'John Smith', position: 'Manager', department: 'Management', status: 'Active', salary: 45000 },
        { id: 2, name: 'Sarah Johnson', position: 'Chef', department: 'Kitchen', status: 'Active', salary: 35000 },
        { id: 3, name: 'Mike Davis', position: 'Waiter', department: 'Service', status: 'Active', salary: 20000 }
    ],
    
    qrcodes: [
        { id: 1, tableNo: 1, estId: 1, status: 'Active', scans: 145 },
        { id: 2, tableNo: 2, estId: 1, status: 'Active', scans: 98 },
        { id: 3, tableNo: 1, estId: 2, status: 'Active', scans: 234 }
    ],
    
    orders: [
        { id: 1001, tableNo: 5, items: 3, total: 450, status: 'Completed', date: '2024-02-05' },
        { id: 1002, tableNo: 8, items: 5, total: 890, status: 'Preparing', date: '2024-02-05' },
        { id: 1003, tableNo: 12, items: 2, total: 320, status: 'Pending', date: '2024-02-05' }
    ]
};

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadPage('dashboard');
    setupSidebar();
}

function setupSidebar() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            loadPage(page);
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Close sidebar on mobile
            const sidebar = document.querySelector('.sidebar');
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });
}

function setupEventListeners() {
    // Menu toggle for mobile
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
}

// ========================================
// PAGE LOADING & NAVIGATION
// ========================================

function loadPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show requested page
    const page = document.getElementById(pageName + '-page');
    if (page) {
        page.classList.add('active');
        app.currentPage = pageName;
        
        // Call page-specific initialization
        switch(pageName) {
            case 'dashboard':
                initDashboard();
                break;
            case 'establishments':
                initEstablishments();
                break;
            case 'menus':
                initMenus();
                break;
            case 'staff':
                initStaff();
                break;
            case 'qrcodes':
                initQRCodes();
                break;
            case 'orders':
                initOrders();
                break;
            case 'settings':
                initSettings();
                break;
        }
    }
}

// ========================================
// DASHBOARD PAGE
// ========================================

function initDashboard() {
    const container = document.getElementById('dashboard-page');
    
    const totalEst = app.establishments.length;
    const totalStaff = app.staff.length;
    const totalMenus = app.menus.length;
    const totalRevenue = app.orders.reduce((sum, order) => sum + order.total, 0);
    
    container.innerHTML = `
        <div class="grid grid-2">
            <div class="stat-card">
                <div class="stat-icon">🏢</div>
                <div class="stat-number">${totalEst}</div>
                <div class="stat-label">Total Establishments</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">👥</div>
                <div class="stat-number">${totalStaff}</div>
                <div class="stat-label">Staff Members</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">📋</div>
                <div class="stat-number">${totalMenus}</div>
                <div class="stat-label">Active Menus</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">💰</div>
                <div class="stat-number">₹${totalRevenue}</div>
                <div class="stat-label">Today's Revenue</div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">Recent Orders</div>
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Table No</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${app.orders.map(order => `
                            <tr>
                                <td>#${order.id}</td>
                                <td>${order.tableNo}</td>
                                <td>${order.items}</td>
                                <td>₹${order.total}</td>
                                <td>
                                    <span class="table-badge badge-${getStatusClass(order.status)}">
                                        ${order.status}
                                    </span>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// ========================================
// ESTABLISHMENTS PAGE
// ========================================

function initEstablishments() {
    const container = document.getElementById('establishments-page');
    
    container.innerHTML = `
        <div class="card">
            <div class="flex-between">
                <div class="card-header" style="border: none; padding: 0;">Manage Establishments</div>
                <button class="btn btn-primary" onclick="showAddEstablishmentModal()">
                    ➕ Add New
                </button>
            </div>
        </div>
        
        <div class="grid">
            ${app.establishments.map(est => `
                <div class="card">
                    <h3>${est.name}</h3>
                    <p class="text-muted">${est.type} • ${est.location}</p>
                    <div class="mt-20">
                        <p><strong>Tables:</strong> ${est.tables}</p>
                        <p><strong>Status:</strong> <span class="table-badge badge-success">${est.status}</span></p>
                    </div>
                    <div class="mt-20" style="display: flex; gap: 10px;">
                        <button class="btn btn-primary btn-small" onclick="editEstablishment(${est.id})">Edit</button>
                        <button class="btn btn-danger btn-small" onclick="deleteEstablishment(${est.id})">Delete</button>
                    </div>
                </div>
            `).join('')}
        </div>
        
        ${getAddEstablishmentModal()}
    `;
}

function showAddEstablishmentModal() {
    const modal = document.getElementById('est-modal');
    if (modal) modal.classList.add('active');
}

function getAddEstablishmentModal() {
    return `
        <div class="modal" id="est-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="modal-close" onclick="closeModal('est-modal')">&times;</span>
                    Add New Establishment
                </div>
                <form onsubmit="addEstablishment(event)">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" id="est-name" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Type</label>
                            <select class="form-control" id="est-type" required>
                                <option>Hotel</option>
                                <option>Café</option>
                                <option>Restaurant</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Location</label>
                            <input type="text" class="form-control" id="est-location" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Number of Tables</label>
                        <input type="number" class="form-control" id="est-tables" required>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Add Establishment</button>
                </form>
            </div>
        </div>
    `;
}

function addEstablishment(e) {
    e.preventDefault();
    const name = document.getElementById('est-name').value;
    const type = document.getElementById('est-type').value;
    const location = document.getElementById('est-location').value;
    const tables = parseInt(document.getElementById('est-tables').value);
    
    const newEst = {
        id: Math.max(...app.establishments.map(e => e.id), 0) + 1,
        name, type, location, status: 'Active', tables
    };
    
    app.establishments.push(newEst);
    closeModal('est-modal');
    showAlert('success', 'Establishment added successfully!');
    initEstablishments();
}

function editEstablishment(id) {
    showAlert('info', 'Edit functionality coming soon!');
}

function deleteEstablishment(id) {
    if (confirm('Are you sure you want to delete this establishment?')) {
        app.establishments = app.establishments.filter(e => e.id !== id);
        showAlert('success', 'Establishment deleted successfully!');
        initEstablishments();
    }
}

// ========================================
// MENUS PAGE
// ========================================

function initMenus() {
    const container = document.getElementById('menus-page');
    
    container.innerHTML = `
        <div class="card">
            <div class="flex-between">
                <div class="card-header" style="border: none; padding: 0;">Manage Menus</div>
                <button class="btn btn-primary" onclick="showAddMenuModal()">
                    ➕ Add New Menu
                </button>
            </div>
        </div>
        
        <div class="card">
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Menu Name</th>
                            <th>Category</th>
                            <th>Items</th>
                            <th>Establishment</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${app.menus.map(menu => `
                            <tr>
                                <td>${menu.name}</td>
                                <td>${menu.category}</td>
                                <td>${menu.items}</td>
                                <td>${app.establishments.find(e => e.id === menu.estId)?.name || 'N/A'}</td>
                                <td><span class="table-badge badge-success">${menu.status}</span></td>
                                <td>
                                    <button class="btn btn-primary btn-small" onclick="editMenu(${menu.id})">Edit</button>
                                    <button class="btn btn-danger btn-small" onclick="deleteMenu(${menu.id})">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
        
        ${getAddMenuModal()}
    `;
}

function showAddMenuModal() {
    const modal = document.getElementById('menu-modal');
    if (modal) modal.classList.add('active');
}

function getAddMenuModal() {
    return `
        <div class="modal" id="menu-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="modal-close" onclick="closeModal('menu-modal')">&times;</span>
                    Add New Menu
                </div>
                <form onsubmit="addMenu(event)">
                    <div class="form-group">
                        <label>Menu Name</label>
                        <input type="text" class="form-control" id="menu-name" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Category</label>
                            <select class="form-control" id="menu-category" required>
                                <option>Food</option>
                                <option>Drinks</option>
                                <option>Desserts</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Number of Items</label>
                            <input type="number" class="form-control" id="menu-items" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Establishment</label>
                        <select class="form-control" id="menu-est" required>
                            ${app.establishments.map(e => `<option value="${e.id}">${e.name}</option>`).join('')}
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Add Menu</button>
                </form>
            </div>
        </div>
    `;
}

function addMenu(e) {
    e.preventDefault();
    const name = document.getElementById('menu-name').value;
    const category = document.getElementById('menu-category').value;
    const items = parseInt(document.getElementById('menu-items').value);
    const estId = parseInt(document.getElementById('menu-est').value);
    
    const newMenu = {
        id: Math.max(...app.menus.map(m => m.id), 0) + 1,
        name, category, items, status: 'Active', estId
    };
    
    app.menus.push(newMenu);
    closeModal('menu-modal');
    showAlert('success', 'Menu added successfully!');
    initMenus();
}

function editMenu(id) {
    showAlert('info', 'Edit functionality coming soon!');
}

function deleteMenu(id) {
    if (confirm('Are you sure you want to delete this menu?')) {
        app.menus = app.menus.filter(m => m.id !== id);
        showAlert('success', 'Menu deleted successfully!');
        initMenus();
    }
}

// ========================================
// STAFF PAGE
// ========================================

function initStaff() {
    const container = document.getElementById('staff-page');
    
    container.innerHTML = `
        <div class="card">
            <div class="flex-between">
                <div class="card-header" style="border: none; padding: 0;">Manage Staff</div>
                <button class="btn btn-primary" onclick="showAddStaffModal()">
                    ➕ Add Staff Member
                </button>
            </div>
        </div>
        
        <div class="card">
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Department</th>
                            <th>Status</th>
                            <th>Salary</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${app.staff.map(member => `
                            <tr>
                                <td>${member.name}</td>
                                <td>${member.position}</td>
                                <td>${member.department}</td>
                                <td><span class="table-badge badge-success">${member.status}</span></td>
                                <td>₹${member.salary}</td>
                                <td>
                                    <button class="btn btn-primary btn-small" onclick="editStaff(${member.id})">Edit</button>
                                    <button class="btn btn-danger btn-small" onclick="deleteStaff(${member.id})">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
        
        ${getAddStaffModal()}
    `;
}

function showAddStaffModal() {
    const modal = document.getElementById('staff-modal');
    if (modal) modal.classList.add('active');
}

function getAddStaffModal() {
    return `
        <div class="modal" id="staff-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="modal-close" onclick="closeModal('staff-modal')">&times;</span>
                    Add Staff Member
                </div>
                <form onsubmit="addStaff(event)">
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" class="form-control" id="staff-name" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Position</label>
                            <input type="text" class="form-control" id="staff-position" required>
                        </div>
                        <div class="form-group">
                            <label>Department</label>
                            <select class="form-control" id="staff-dept" required>
                                <option>Management</option>
                                <option>Kitchen</option>
                                <option>Service</option>
                                <option>Housekeeping</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Monthly Salary</label>
                        <input type="number" class="form-control" id="staff-salary" required>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Add Staff Member</button>
                </form>
            </div>
        </div>
    `;
}

function addStaff(e) {
    e.preventDefault();
    const name = document.getElementById('staff-name').value;
    const position = document.getElementById('staff-position').value;
    const department = document.getElementById('staff-dept').value;
    const salary = parseInt(document.getElementById('staff-salary').value);
    
    const newStaff = {
        id: Math.max(...app.staff.map(s => s.id), 0) + 1,
        name, position, department, status: 'Active', salary
    };
    
    app.staff.push(newStaff);
    closeModal('staff-modal');
    showAlert('success', 'Staff member added successfully!');
    initStaff();
}

function editStaff(id) {
    showAlert('info', 'Edit functionality coming soon!');
}

function deleteStaff(id) {
    if (confirm('Are you sure you want to remove this staff member?')) {
        app.staff = app.staff.filter(s => s.id !== id);
        showAlert('success', 'Staff member removed successfully!');
        initStaff();
    }
}

// ========================================
// QR CODES PAGE
// ========================================

function initQRCodes() {
    const container = document.getElementById('qrcodes-page');
    
    container.innerHTML = `
        <div class="card">
            <div class="flex-between">
                <div class="card-header" style="border: none; padding: 0;">QR Code Management</div>
                <button class="btn btn-primary" onclick="showGenerateQRModal()">
                    ➕ Generate QR Code
                </button>
            </div>
        </div>
        
        <div class="card">
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Table Number</th>
                            <th>Establishment</th>
                            <th>Status</th>
                            <th>Total Scans</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${app.qrcodes.map(qr => `
                            <tr>
                                <td>Table ${qr.tableNo}</td>
                                <td>${app.establishments.find(e => e.id === qr.estId)?.name || 'N/A'}</td>
                                <td><span class="table-badge badge-success">${qr.status}</span></td>
                                <td>${qr.scans}</td>
                                <td>
                                    <button class="btn btn-primary btn-small" onclick="viewQRDetails(${qr.id})">View</button>
                                    <button class="btn btn-danger btn-small" onclick="deleteQR(${qr.id})">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
        
        ${getGenerateQRModal()}
    `;
}

function showGenerateQRModal() {
    const modal = document.getElementById('qr-modal');
    if (modal) modal.classList.add('active');
}

function getGenerateQRModal() {
    return `
        <div class="modal" id="qr-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="modal-close" onclick="closeModal('qr-modal')">&times;</span>
                    Generate QR Code
                </div>
                <form onsubmit="generateQRCode(event)">
                    <div class="form-group">
                        <label>Establishment</label>
                        <select class="form-control" id="qr-est" required>
                            ${app.establishments.map(e => `<option value="${e.id}">${e.name}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Table Number</label>
                        <input type="number" class="form-control" id="qr-table" min="1" required>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Generate QR Code</button>
                </form>
            </div>
        </div>
    `;
}

function generateQRCode(e) {
    e.preventDefault();
    const estId = parseInt(document.getElementById('qr-est').value);
    const tableNo = parseInt(document.getElementById('qr-table').value);
    
    const newQR = {
        id: Math.max(...app.qrcodes.map(q => q.id), 0) + 1,
        tableNo, estId, status: 'Active', scans: 0
    };
    
    app.qrcodes.push(newQR);
    closeModal('qr-modal');
    showAlert('success', 'QR code generated successfully!');
    initQRCodes();
}

function viewQRDetails(id) {
    const qr = app.qrcodes.find(q => q.id === id);
    if (qr) {
        const est = app.establishments.find(e => e.id === qr.estId);
        showAlert('info', `QR Details: ${est.name} - Table ${qr.tableNo} - ${qr.scans} scans`);
    }
}

function deleteQR(id) {
    if (confirm('Are you sure you want to delete this QR code?')) {
        app.qrcodes = app.qrcodes.filter(q => q.id !== id);
        showAlert('success', 'QR code deleted successfully!');
        initQRCodes();
    }
}

// ========================================
// ORDERS PAGE
// ========================================

function initOrders() {
    const container = document.getElementById('orders-page');
    
    const completedOrders = app.orders.filter(o => o.status === 'Completed').length;
    const pendingOrders = app.orders.filter(o => o.status === 'Pending').length;
    const totalOrderRevenue = app.orders.reduce((sum, o) => sum + o.total, 0);
    
    container.innerHTML = `
        <div class="grid grid-2">
            <div class="stat-card">
                <div class="stat-icon">📦</div>
                <div class="stat-number">${app.orders.length}</div>
                <div class="stat-label">Total Orders</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">⏳</div>
                <div class="stat-number">${pendingOrders}</div>
                <div class="stat-label">Pending Orders</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">✅</div>
                <div class="stat-number">${completedOrders}</div>
                <div class="stat-label">Completed Orders</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">💵</div>
                <div class="stat-number">₹${totalOrderRevenue}</div>
                <div class="stat-label">Total Revenue</div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">All Orders</div>
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Table</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${app.orders.map(order => `
                            <tr>
                                <td>#${order.id}</td>
                                <td>${order.tableNo}</td>
                                <td>${order.items}</td>
                                <td>₹${order.total}</td>
                                <td>${order.date}</td>
                                <td><span class="table-badge badge-${getStatusClass(order.status)}">${order.status}</span></td>
                                <td>
                                    <button class="btn btn-primary btn-small" onclick="updateOrderStatus(${order.id})">Update</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function updateOrderStatus(id) {
    const order = app.orders.find(o => o.id === id);
    if (order) {
        const statuses = ['Pending', 'Preparing', 'Completed'];
        const currentIndex = statuses.indexOf(order.status);
        const nextStatus = statuses[(currentIndex + 1) % statuses.length];
        order.status = nextStatus;
        showAlert('success', `Order #${id} status updated to: ${nextStatus}`);
        initOrders();
    }
}

// ========================================
// SETTINGS PAGE
// ========================================

function initSettings() {
    const container = document.getElementById('settings-page');
    
    container.innerHTML = `
        <div class="card">
            <div class="card-header">Account Settings</div>
            <div class="form-row full">
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" class="form-control" value="${app.currentUser.name}">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" value="${app.currentUser.email}">
                </div>
                <div class="form-group">
                    <label>Role</label>
                    <input type="text" class="form-control" value="${app.currentUser.role}" disabled>
                </div>
                <button class="btn btn-primary" onclick="showAlert('info', 'Settings update feature coming soon!')">
                    Save Changes
                </button>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">System Settings</div>
            <div class="form-group">
                <label>
                    <input type="checkbox" checked> Enable Notifications
                </label>
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox" checked> Dark Mode
                </label>
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox"> Maintenance Mode
                </label>
            </div>
            <button class="btn btn-success">Apply Settings</button>
        </div>
    `;
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
}

function getStatusClass(status) {
    const map = {
        'Active': 'success',
        'Completed': 'success',
        'Preparing': 'warning',
        'Pending': 'warning',
        'Inactive': 'danger'
    };
    return map[status] || 'primary';
}

function showAlert(type, message) {
    // Create alert container if not exists
    let alertContainer = document.getElementById('alert-container');
    if (!alertContainer) {
        alertContainer = document.createElement('div');
        alertContainer.id = 'alert-container';
        alertContainer.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 999; max-width: 400px;';
        document.body.appendChild(alertContainer);
    }
    
    const alertId = 'alert-' + Date.now();
    const alertDiv = document.createElement('div');
    alertDiv.id = alertId;
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `
        <span>${message}</span>
        <span class="modal-close" onclick="document.getElementById('${alertId}').remove()" style="margin-left: auto; cursor: pointer;">×</span>
    `;
    
    alertContainer.appendChild(alertDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        const el = document.getElementById(alertId);
        if (el) el.remove();
    }, 5000);
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        showAlert('success', 'Logged out successfully!');
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }
}

// Close modals when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});
