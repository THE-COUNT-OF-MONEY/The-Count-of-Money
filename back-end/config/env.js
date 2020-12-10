
require('dotenv').config();

function isInProduction() {
    if (process.env.NODE_ENV && process.env.NODE_ENV === "prod")
        return true;

    return false;
}

module.exports = {

    getVariables() {
        let database = {
            credentials: isInProduction() ? process.env.CREDENTIALS_PROD : process.env.CREDENTIALS_DEV,
            databaseUrl: isInProduction() ? process.env.DATABASE_URL_PROD : process.env.DATABASE_URL_DEV
        }

        return {
            database: database,
            server: {
                port: process.env.PORT,
                host: process.env.HOST
            }
        }
    },

    isConform () {
        if (!process.env.NODE_ENV || !process.env.DATABASE_URL_PROD || !process.env.DATABASE_URL_DEV || !process.env.CREDENTIALS_DEV || !process.env.CREDENTIALS_PROD)
            return false;

        return true;
    },

}