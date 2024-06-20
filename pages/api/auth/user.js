import { createRouter } from 'next-connect';
import axios from "axios";
import jwt from "jsonwebtoken";
import bodyParser from 'body-parser';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

const router = createRouter();

router.use(bodyParser.json());

router.post(async (req, res, next) => {
    try {
        const { token } = req.body; // Получение параметров из тела запроса
        if (!token) {
            return res.status(400).json({ error: 'Missing steamid parameter' });
        }
        let steamid = '';
        jwt.verify(token, serverRuntimeConfig.secretKey, (err, result) => {
            if (err) return res.sendStatus(403);
            steamid = result;
        });
        let steamProfile = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${serverRuntimeConfig.steamApiKey}&steamids=${steamid}`);
        steamProfile = steamProfile.data.response.players[0];
        res.status(200).json({ 
            steamUser: {
                steamid: steamProfile.steamid,
                username: steamProfile.personaname,
                profileURL: steamProfile.profileurl,
                avatarURL: steamProfile.avatar
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
    
});

export default router.handler();