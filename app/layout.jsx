"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import '/styles/globals.css'
import { useState, useEffect } from 'react'
import { getCookie } from 'cookies-next';
import axios from "axios";
import StoreProvider from "./StoreProvider";

const metadata = {
  title: "UX-CMS",
  description: "UX-CMS — игровой проект по игре Counter-Strike: 2",
  favicon: {
    rel: "icon",
    type: "image/x-icon",
    href: "/static/favicon.ico"
  }
};


export default function RootLayout({ children }) {
  const [User, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const access_token = getCookie('access_token');

        if (!access_token) {
          return false;
        }

        const res = await axios.post('/api/auth/user',
          {
            token: access_token
          },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );

        setUser(res.data.steamUser);
      } catch (error) {
        console.error('Error fetching Steam profile:', error);
      }
      
    }

    fetchUser();
  }, []);


  return (
    <html lang="ru">
      <head>
        <title>{metadata.title || ''}</title>
        <meta name="description" content={metadata.description} />
        <link rel={metadata.favicon.rel} type={metadata.favicon.type} href={metadata.favicon.href} />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0" />
      </head>
      <body>
          <StoreProvider>
            <Header element={User} />
          </StoreProvider>
          {children}
          <Footer />
      </body>
    </html>
  );
}
