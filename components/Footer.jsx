import style from "/styles/footer.module.css";
import Link from 'next/link';
import Image from "next/image";

const links = [
    { href: '/shop', label: 'Магазин' },
    { href: '/stats', label: 'FAQ' },
    { href: '/news', label: 'Новости' },
    { href: '/rules', label: 'Договор оферты' }
  ].map(link => {
    link.key = `nav-link-${link.href}-${link.label}`
    return link
  });

export default function Footer() {
    

    return (
        <footer className={style.container}>
            <div className={style.left}>
                {/* <Image
                    className={style.logo}
                    src="/next.svg"
                    alt="Next.js Logo"
                    width={127}
                    height={38}
                    priority
                    /> */}

                    <h1 className={style.logo}>UX-CMS</h1>
                <p>UX-CMS — игровой проект по игре Counter-Strike: 2</p>
            </div>

            <div className={style.right}>
                <ul>
                {links.map(({ key, href, label }) => (
                    <li key={key} className={style.li}>
                    <Link href={href} className={style.Link}>
                        {label}
                    </Link>
                    </li>
                ))}
                </ul>
            </div>
        </footer>
    )
}