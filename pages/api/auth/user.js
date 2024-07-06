import { createRouter } from 'next-connect';
import axios from "axios";
import jwt from "jsonwebtoken";
import bodyParser from 'body-parser';
import getConfig from 'next/config';
import cheerio from "cheerio";
const { serverRuntimeConfig } = getConfig();

const router = createRouter();

router.use(bodyParser.json());

router.post(async (req, res) => {
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

        const response = await axios.get(steamProfile.profileurl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });
        const $ = cheerio.load(response.data);
        const avatar = $('.playerAvatarAutoSizeInner img')[1].attribs.src; // Измените селектор в соответствии с актуальной разметкой страницы

        return res.status(200).json({ 
            steamUser: {
                steamid: steamProfile.steamid,
                username: steamProfile.personaname,
                profileURL: steamProfile.profileurl,
                avatarURL: steamProfile.steamid == '76561198262972540' ? avatar.search('.gif') != 1 ? avatar : steamProfile.avatar : steamProfile.avatar
            }
            
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
    
});

export default router.handler();