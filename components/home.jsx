import Image from "next/image";
import Link from "next/link";
import style from "/styles/home.module.css";

const servers = [
  {
    icon: '/static/iconGame/cs2.png',
    serverName: 'Нериальный побег',
    ip: '37.18.21.170:27026',
    map: 'Даст 2',
    player: 5,
    maxPlayer: 36
  },
  {
    icon: '/static/iconGame/warhamer.png',
    serverName: 'Это побег детки!',
    ip: '185.40.6.31:28039',
    map: 'Эншент нахуй',
    player: 100,
    maxPlayer: 500
  },
  {
    icon: '/static/iconGame/cs1.6.png',
    serverName: 'Побег из Шоушенко!',
    ip: '188.169.198.214:27039',
    map: 'jail',
    player: 50,
    maxPlayer: 70
  }
].map(elem => {
  elem.key = `server`
  return elem;
});

export default function Home() {
  return (
    <main className={style.main}>
      <div className={style.containerServers}>
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
            {servers.map(({ icon, serverName, ip, map, player, maxPlayer, key }) => (
              <tr>
                <td key={key} className={style.serverName}>
                  <Image 
                    src={icon}
                    width={23}
                    height={23}
                    priority
                    alt="game"
                  />
                  {serverName}
                </td>
                <td key={key} ><Link className={style.connect} href={`steam://connect/${ip}`}>{ip}</Link></td>
                <td key={key} >{map}</td>
                <td key={key} >{player} / {maxPlayer}</td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}