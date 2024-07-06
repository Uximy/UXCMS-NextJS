import { useState, useRef, useEffect } from 'react';
import Style from '/styles/header.module.css';
import dropstyle from "/styles/dropdownmenu.module.css";
import Image from "next/image";
import Link from 'next/link';

export default function UserBar(User) {
    User = User.element;

    const dropDownLinks = [
        { href: `/profile/${User.steamid}`, label: 'Профиль' },
        { href: '/profile/settings', label: 'Настройки' },
        { href: '/exit', label: 'Выход' }
    ].map(link => {
        link.key = `nav-link-${link.href}-${link.label}`
        return link
    });

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className={`${Style.UserBar} ${isOpen ? dropstyle.ActiveDropDown : ''}`} onClick={toggleDropdown}>
            <div className={Style.bar}>
                <span className={Style.NickName}>{User.username}</span>
                <Image
                    className={Style.avatar}
                    src={User.avatarURL}
                    alt="User Avatar"
                    width={45}
                    height={45}
                    property='true'
                    unoptimized
                />
            </div>
            {isOpen && (
                <ul className={dropstyle.DownMenu}>
                    {dropDownLinks.map(({ key, href, label }) => (
                        <li key={key} className={dropstyle.li}>
                            <Link href={href} className={dropstyle.Link}>
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}