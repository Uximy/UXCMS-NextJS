import mysql from "mysql2";

const pool = mysql.createPool({
    host: process.env.DB_IP,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const checkConnection = async () => {
    try {
        const connection = pool.getConnection();
        await connection.ping();
        console.log('Подключение к базе данных выполнено успешно');
        connection.release();
    } catch (error) {
        console.error('Не удалось подключиться к базе данных:', error.message);
    }
};

checkConnection();

export let query = async (request, values) => {
    return new Promise((resolve, reject) => {
        pool.query(request, values, (error, results, fields) => {
            if (error) {
                console.error('Database query error:', error.message);
                return reject(error);
            }
            resolve(results);
        });
    });
};