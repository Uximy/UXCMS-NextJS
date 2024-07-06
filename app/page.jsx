"use client";

import Home from "/components/home";
import { useState, useEffect, useRef } from "react";
import axios from "axios";


export default function Index() {
    const [servers, setServers] = useState([]);
    const IsCheck = useRef(false);

    useEffect(() => {

        async function fetchServers() {
            try {
                const res = await axios.post('/api/servers',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                );
                
                setServers(res.data);
            } catch (error) {
                console.error('Error fetching Steam profile:', error);
            }
            console.log('обновил сервера');
        }

        if (!IsCheck.current) {
            fetchServers();
            IsCheck.current = true;
        }
        
        const interval = setInterval(fetchServers, 600000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Home element={servers} />
    );
}
