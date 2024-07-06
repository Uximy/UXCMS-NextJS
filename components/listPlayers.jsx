import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import style from "/styles/listStats.module.css";

export function ListPlayers({ serverId, setRenderedComponent }) {
    const [statsPlayer, setStatsPlayer] = useState([]);
    const dropdownRef = useRef(null);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await axios.post('/api/servers/playerList',
                    {
                        serverId
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },

                );
                setStatsPlayer(res.data);
            } catch (error) {
                console.error('Error fetching Steam profile:', error);
            }
            console.log('обновил сервера');
        }

        fetchStats();

    }, [serverId]);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setRenderedComponent(false);
        }
    };
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.documentElement.style = 'overflow: hidden';
        return () => {
            document.documentElement.style = '';
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    

    return (
        <div ref={dropdownRef} className={style.containerStatsTable}>
            <table className={style.tableStats}>
                <thead>
                    <tr>
                        <th><i class="material-symbols-rounded">person</i>Игрок</th>
                        <th><i class="fa-solid fa-skull"></i>Общий Счёт</th>
                        <th><i className="material-symbols-rounded">timer</i>Время в игре</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        statsPlayer[0] != null && statsPlayer[0].name != '' ? statsPlayer.map(({ name, raw }) => {
                                const min = Math.floor(raw.time / 60) % 60;
                                const hour = Math.floor(raw.time / 60 / 60);
                                return (
                                    <tr>
                                    <td className={style.nickname}>
                                        {name}
                                    </td>
                                    <td >{raw.score}</td>
                                    <td >{hour.toString().padStart(2, '0')}:{min.toString().padStart(2, '0')}</td>
                                </tr>
                                )
                            })
                        :
                        <div className={style.warning}>нет игроков</div>
                    }
                </tbody>
            </table>
        </div>
    )
}