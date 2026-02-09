'use client';

import { AppProvider } from '@/app/lib/context';
import '@/app/styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>EntaurentQR - Table QR Menu Management System</title>
        <meta name="description" content="Manage digital menus and QR codes for restaurants with EntaurentQR" />
      </head>
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
