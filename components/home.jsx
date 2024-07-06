import Image from "next/image";
import Link from "next/link";
import style from "/styles/home.module.css";
import { ListPlayers } from "./listPlayers.jsx";
import { useState } from 'react';

function compactServerList(servers, handleClick) {
  return (
    <div className={style.containerServersTable}>
      <table className={style.servers}>
        <thead>
          <tr>
            <th><i className="material-symbols-rounded">dns</i>Название сервера</th>
            <th><i className="material-symbols-rounded">bring_your_own_ip</i>IP Сервера</th>
            <th><i className="material-symbols-rounded">public</i>Карта</th>
            <th ><i className="material-symbols-rounded">group</i>Количество</th>
          </tr>
        </thead>

        <tbody>
          {servers.map(({ id, icon, customName, ip, port, map, players, maxPlayer, key }) => (
            <tr>
              <td key={key} className={style.serverName}>
                <Image
                  src={icon}
                  width={23}
                  height={23}
                  priority
                  alt="game"
                />
                {customName}
              </td>
              <td key={key} ><Link className={style.connect} href={`steam://connect/${ip}:${port}`}>{ip}:{port}</Link></td>
              <td key={key} >{map}</td>
              <td key={key} ><span className={style.players} onClick={() => handleClick(id)}>{players} / {maxPlayer}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function serverListCards(servers, handleClick) {
  return (
    <div className={style.containerServers}>
      {servers.map(({ id, customName, ip, port, map, imageNameMap, players, maxPlayer }) => (
        <div className={style.card}>
          <img
            src={imageNameMap}
            alt={map}
            className={style.maps}
          />
          <div className={style.cardDown}>
            <span className={style.title}>{customName}</span>
            <div className={style.lineCard}></div>
            <div>
              <div className={style.players} onClick={() => handleClick(id)}>{players} / {maxPlayer}</div>
              <Link className={style.connect} href={`steam://connect/${ip}:${port}`}><i className="fa-regular fa-circle-play"></i></Link>

            </div>
          </div>
        </div>
      ))}
    </div>

  )
}

export default function Home(servers) {
  let toggleServerList = 1;

  const [renderedComponent, setRenderedComponent] = useState(false);

  const handleClick = (serverId) => {
    setRenderedComponent(<ListPlayers serverId={serverId} setRenderedComponent={setRenderedComponent} />);
  };

  return (
    <main className={style.main}>
      {renderedComponent}
      {toggleServerList ? serverListCards(servers.element, handleClick) : compactServerList(servers.element, handleClick)}
    </main >
  );
}