'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [establishments, setEstablishments] = useState([
    { id: 1, name: 'The Grand Hotel', type: 'Hotel', location: 'Downtown', status: 'Active', tables: 45 },
    { id: 2, name: 'Coffee Lounge', type: 'Café', location: 'Main Street', status: 'Active', tables: 20 },
    { id: 3, name: 'Sunset Restaurant', type: 'Restaurant', location: 'Beachside', status: 'Active', tables: 60 }
  ]);

  const [menus, setMenus] = useState([
    { id: 1, name: 'Breakfast Menu', category: 'Food', items: 25, status: 'Active', estId: 1 },
    { id: 2, name: 'Beverages', category: 'Drinks', items: 15, status: 'Active', estId: 2 },
    { id: 3, name: 'Dinner Special', category: 'Food', items: 40, status: 'Active', estId: 3 }
  ]);

  const [staff, setStaff] = useState([
    { id: 1, name: 'John Smith', position: 'Manager', department: 'Management', status: 'Active', salary: 45000 },
    { id: 2, name: 'Sarah Johnson', position: 'Chef', department: 'Kitchen', status: 'Active', salary: 35000 },
    { id: 3, name: 'Mike Davis', position: 'Waiter', department: 'Service', status: 'Active', salary: 20000 }
  ]);

  const [qrcodes, setQRCodes] = useState([
    { id: 1, tableNo: 1, estId: 1, status: 'Active', scans: 145, url: 'https://entaurent.in/qr/001' },
    { id: 2, tableNo: 2, estId: 1, status: 'Active', scans: 98, url: 'https://entaurent.in/qr/002' },
    { id: 3, tableNo: 1, estId: 2, status: 'Active', scans: 234, url: 'https://entaurent.in/qr/003' }
  ]);

  const [orders, setOrders] = useState([
    { id: 1001, tableNo: 5, estId: 1, items: 3, total: 450, status: 'Completed', date: '2024-02-05' },
    { id: 1002, tableNo: 8, estId: 1, items: 5, total: 890, status: 'Preparing', date: '2024-02-05' },
    { id: 1003, tableNo: 12, estId: 3, items: 2, total: 320, status: 'Pending', date: '2024-02-05' }
  ]);

  const [alerts, setAlerts] = useState([]);

  // Authentication functions
  const login = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  // Alert functions
  const showAlert = (type, message) => {
    const alert = {
      id: Date.now(),
      type,
      message
    };
    setAlerts(prev => [...prev, alert]);
    setTimeout(() => {
      removeAlert(alert.id);
    }, 5000);
  };

  const removeAlert = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  // Establishment functions
  const addEstablishment = (est) => {
    const newEst = {
      ...est,
      id: Math.max(...establishments.map(e => e.id), 0) + 1,
      status: 'Active'
    };
    setEstablishments([...establishments, newEst]);
    showAlert('success', 'Establishment added successfully!');
    return newEst;
  };

  const updateEstablishment = (id, data) => {
    setEstablishments(establishments.map(e => e.id === id ? { ...e, ...data } : e));
    showAlert('success', 'Establishment updated successfully!');
  };

  const deleteEstablishment = (id) => {
    setEstablishments(establishments.filter(e => e.id !== id));
    showAlert('success', 'Establishment deleted successfully!');
  };

  // Menu functions
  const addMenu = (menu) => {
    const newMenu = {
      ...menu,
      id: Math.max(...menus.map(m => m.id), 0) + 1,
      status: 'Active'
    };
    setMenus([...menus, newMenu]);
    showAlert('success', 'Menu added successfully!');
    return newMenu;
  };

  const updateMenu = (id, data) => {
    setMenus(menus.map(m => m.id === id ? { ...m, ...data } : m));
    showAlert('success', 'Menu updated successfully!');
  };

  const deleteMenu = (id) => {
    setMenus(menus.filter(m => m.id !== id));
    showAlert('success', 'Menu deleted successfully!');
  };

  // Staff functions
  const addStaff = (staffMember) => {
    const newStaff = {
      ...staffMember,
      id: Math.max(...staff.map(s => s.id), 0) + 1,
      status: 'Active'
    };
    setStaff([...staff, newStaff]);
    showAlert('success', 'Staff member added successfully!');
    return newStaff;
  };

  const updateStaff = (id, data) => {
    setStaff(staff.map(s => s.id === id ? { ...s, ...data } : s));
    showAlert('success', 'Staff member updated successfully!');
  };

  const deleteStaff = (id) => {
    setStaff(staff.filter(s => s.id !== id));
    showAlert('success', 'Staff member removed successfully!');
  };

  // QR Code functions
  const addQRCode = (qr) => {
    const newQR = {
      ...qr,
      id: Math.max(...qrcodes.map(q => q.id), 0) + 1,
      status: 'Active',
      scans: 0,
      url: `https://entaurent.in/qr/${String(Math.max(...qrcodes.map(q => q.id), 0) + 1).padStart(3, '0')}`
    };
    setQRCodes([...qrcodes, newQR]);
    showAlert('success', 'QR code generated successfully!');
    return newQR;
  };

  const updateQRCode = (id, data) => {
    setQRCodes(qrcodes.map(q => q.id === id ? { ...q, ...data } : q));
    showAlert('success', 'QR code updated successfully!');
  };

  const deleteQRCode = (id) => {
    setQRCodes(qrcodes.filter(q => q.id !== id));
    showAlert('success', 'QR code deleted successfully!');
  };

  // Order functions
  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: Math.max(...orders.map(o => o.id), 0) + 1,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };
    setOrders([...orders, newOrder]);
    showAlert('success', 'Order created successfully!');
    return newOrder;
  };

  const updateOrder = (id, data) => {
    setOrders(orders.map(o => o.id === id ? { ...o, ...data } : o));
    showAlert('success', 'Order updated successfully!');
  };

  const deleteOrder = (id) => {
    setOrders(orders.filter(o => o.id !== id));
    showAlert('success', 'Order deleted successfully!');
  };

  const value = {
    user,
    login,
    logout,
    establishments,
    addEstablishment,
    updateEstablishment,
    deleteEstablishment,
    menus,
    addMenu,
    updateMenu,
    deleteMenu,
    staff,
    addStaff,
    updateStaff,
    deleteStaff,
    qrcodes,
    addQRCode,
    updateQRCode,
    deleteQRCode,
    orders,
    addOrder,
    updateOrder,
    deleteOrder,
    alerts,
    showAlert,
    removeAlert
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
