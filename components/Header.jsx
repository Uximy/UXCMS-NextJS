'use client';

import Link from 'next/link';
import Style from '/styles/header.module.css';
import Image from "next/image";
import UserBar from "./UserBar";
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { fetchPlayersOnline } from '../lib/Slices/playerSlice';
import { useEffect } from 'react';

const links = [
  { href: '/', label: 'Главная' },
  { href: '/shop', label: 'Магазин' },
  { href: '/stats', label: 'Статистика' },
  { href: '/news', label: 'Новости' },
  { href: '/rules', label: 'Правила' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
});

export default function Header(User) {
  
  User = User.element;
  const dispatch = useAppDispatch();
  const onlinePlayers = useAppSelector(state => state.players.online);
  const status = useAppSelector(state => state.players.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPlayersOnline());
    }

    const interval = setInterval(() => {
      console.log('обновил общий счётчик');
      return dispatch(fetchPlayersOnline())
    }, 600000);
    return () => clearInterval(interval);
  }, [status, dispatch]);
  
  
  
  return (
    <div className={Style.Header}>
      <div className={Style.headerInfo}>
        <Link href={'/'} className={Style.effect}>
          {/* <Image
              className={Style.logo}
              src="/next.svg"
              alt="Next.js Logo"
              width={127}
              height={38}
              priority
            /> */}
            <h1 className={Style.logo}>UX-CMS</h1>
        </Link>

        <div className={Style.CountOnlineServers}>
          <p><span className={Style.pulse}></span>Всего игроков :</p>
          <span>{onlinePlayers}</span>
        </div>
      </div>
      
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
            <div>
              <i className={"fa-brands fa-steam"} ></i>
              Войти через Steam
            </div>
          </Link>
        :
          <UserBar element={User} />
      }
    </div>
  );
}