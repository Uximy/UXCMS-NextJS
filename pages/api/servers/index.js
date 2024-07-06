import { GameDig } from "gamedig";
import { createRouter } from 'next-connect';
import bodyParser from 'body-parser';
import fs from "fs";
import { query } from "/lib/db.js";

const router = createRouter();

router.use(bodyParser.json());


router.post(async (req, res) => {
    try {
        const servers = await query("SELECT * FROM ux_servers");
        const serverPromises = servers.map(async (elem) => {
        try {
            const game = new GameDig()
            const server = await game.query({
                type: 'counterstrike2',
                address: elem.ip,
                port: elem.port
            });

            if (elem.customName === null) elem.customName = server.name;
            elem.players = server.numplayers;
            elem.maxPlayer = server.maxplayers;
            elem.map = server.map;
            if (fs.existsSync(`./static/maps/${server.map}.png`)) elem.imageNameMap = `/static/maps/${server.map}.png`;
            else elem.imageNameMap = 'https://placehold.co/240x206';

            return elem;
        } catch (error) {
            console.error(`Error querying server ${elem.ip}:`, error.message);
        }
        });
        let resolvedServers = await Promise.all(serverPromises);
        res.status(200).json(resolvedServers);
    } catch (error) {
        console.error('Error handling request:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router.handler();