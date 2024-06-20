'use client';

import Link from 'next/link';
import Style from '/styles/header.module.css';
import Image from "next/image";
import dropstyle from "/styles/dropdownmenu.module.css";
import { useState, useEffect } from 'react'
import { getCookie } from 'cookies-next';
import axios from "axios";



const links = [
  { href: '/', label: 'Главная' },
  { href: '/test', label: 'Тест страница' },
  { href: '/news', label: 'Новости' },
  { href: '/rules', label: 'Правила' },
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
});

export default function Header() {

  const [User, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const access_token = getCookie('access_token');

        if (!access_token) {
          console.error('No access token found');
          return;
        }

        // Запрос данных пользователя через API
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

  
  const dropDownLinks = [
    { href: User ? User.profileURL : '', label: 'Профиль' },
    { href: '/setting', label: 'Настройки' },
    { href: '/exit', label: 'Выход' }
  ].map(link => {
    link.key = `nav-link-${link.href}-${link.label}`
    return link
  });

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    if (isOpen) {
      setIsOpen(false);
    }

    setIsOpen(!isOpen);
  };


  return (
    <div className={Style.Header}>
      <Link href={'/'} className={Style.effect}>
        <Image
            className={Style.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={127}
            height={38}
            priority
          />
      </Link>

      <nav className={Style.nav}>
        <ul className={Style.ul}>
          {links.map(({ key, href, label }) => (
            <li key={key} className={Style.li}>
              <Link href={href} className={Style.Link}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {!User ?
          <Link
            href={'/api/auth/steam'}
            className={Style.btnLogin}
          >
            Авторизоваться
          </Link>
        :
          <div className={`${Style.UserBar} ${isOpen ? dropstyle.ActiveDropDown : ''}`} onClick={toggleDropdown}>
            <div className={Style.bar}>
              <span className={Style.NickName}>{User.username}</span>
              <Image
                className={Style.avatar}
                src={User.avatarURL}
                alt="User Avatar"
                width={45}
                height={45}
              />
            </div>

            {isOpen && (
              <ul className={dropstyle.DownMenu}>
                {dropDownLinks.map(({ key, href, label, func }) => (
                  <li key={key} className={dropstyle.li}>
                    <Link href={href} className={dropstyle.Link}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
      }
      

      
    </div>
  );
}