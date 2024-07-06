import { GameDig } from "gamedig";
import { createRouter } from 'next-connect';
import bodyParser from 'body-parser';
import { query } from "/lib/db.js";

const router = createRouter();

router.use(bodyParser.json());


router.post(async (req, res) => {
    try {
        const { serverId } = req.body;
        const servers = await query("SELECT `id`, `ip`, `port` FROM ux_servers WHERE id = ?", [serverId]);
        const game = new GameDig()
        const server = await game.query({
            type: 'counterstrike2',
            address: servers[0].ip,
            port: servers[0].port
        });

        // console.log(server.players);
        res.status(200).json(server.players);
    } catch (error) {
        console.error('Error handling request:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router.handler();