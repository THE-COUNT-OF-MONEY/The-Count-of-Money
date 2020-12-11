
require('dotenv').config();

function isInProduction() {
    if (process.env.NODE_ENV && process.env.NODE_ENV === "prod")
        return true;

    return false;
}

module.exports = {

    getVariables() {

        const devConfig = {
            apiKey: 'AIzaSyDndtZWxGbteNSLobZ5O2CmS1fyX-2sAGg',
            authDomain: 'count-of-money-dev.firebaseapp.com',
            databaseURL: 'https://count-of-money-dev.firebaseio.com',
            projectId: 'count-of-money-dev',
            storageBucket: 'count-of-money-dev.appspot.com',
            messagingSenderId: '516320172645',
            appId: '1:516320172645:web:cfb490ef4bf66a96d3848c',
            measurementId: 'G-5N4WKF17VF'
        };

        const prodConfig = {
            apiKey: "AIzaSyDdbAo9cJeQ8qUsCdutPTuQEreb7SedvbY",
            authDomain: "count-of-money-prod.firebaseapp.com",
            databaseURL: "https://count-of-money-prod.firebaseio.com",
            projectId: "count-of-money-prod",
            storageBucket: "count-of-money-prod.appspot.com",
            messagingSenderId: "226050228862",
            appId: "1:226050228862:web:646463b711ffca90ac0e2f",
            measurementId: "G-JH3JRJ197S"
          };

        let database = {
            credentials: isInProduction() ? process.env.CREDENTIALS_PROD : process.env.CREDENTIALS_DEV,
            databaseUrl: isInProduction() ? process.env.DATABASE_URL_PROD : process.env.DATABASE_URL_DEV,
            config: isInProduction() ? prodConfig : devConfig
        }

        return {
            database: database,
            server: {
                port: process.env.PORT ?? 4000,
                host: process.env.HOST ?? "127.0.0.1"
            }
        }
    },

    isConform () {
        if (!process.env.NODE_ENV || !process.env.DATABASE_URL_PROD || !process.env.DATABASE_URL_DEV || !process.env.CREDENTIALS_DEV || !process.env.CREDENTIALS_PROD)
            return false;

        return true;
    },

}