import React, { useContext } from 'react';
// eslint-disable-next-line
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import { Login } from './components/Login';
import { Profile } from './components/Profile';
import Register from './components/Register';
import { UserContext } from './context/userContext';
import { Currencies } from './ressources/currencies/CurrenciesWidget';
import { CryptoBank } from './ressources/currencies/CryptoBankWidget';
import { Feeds } from './ressources/feeds/FeedsWidget';
import { Settings } from './ressources/settings/Settings';
import Users from './ressources/Users/Users';

export const Routes = () => {
    const {user} = useContext(UserContext);
    const routes = [
        {
            path: '/',
            widget: Currencies,
            role: ['', 'ROLE_USER', 'ROLE_ADMIN']
        },
        {
            path: '/bank',
            widget: Currencies,
            role: ['ROLE_USER']
        },
        {
            path: '/feeds',
            widget: Feeds,
            role: ['', 'ROLE_USER', 'ROLE_ADMIN']
        },
        {
            path: '/login',
            widget: Login,
            role: ['']
        },
        {
            path: '/register',
            widget: Register,
            role: ['']
        },
        {
            path: '/profile',
            widget: Profile,
            role: ['', 'ROLE_USER', 'ROLE_ADMIN']
        },
        {
            path: '/cryptoBank',
            widget: CryptoBank,
            role: ['', 'ROLE_USER', 'ROLE_ADMIN']
        },
        {
            path: '/users',
            widget: Users,
            role: ['ROLE_ADMIN']
        },
        {
            path: '/settings',
            widget: Settings,
            role: ['ROLE_ADMIN']
        },
    ]

    return (
        <div>
            {
                routes.map((route, key) => {
                    if (route.role.includes(user.role)) {
                        return  <Route exact path={route.path} component={route.widget} key={key}/>
                    } else {
                        return <div key={key}></div>
                    }
                })
            }
        </div>

    )

}