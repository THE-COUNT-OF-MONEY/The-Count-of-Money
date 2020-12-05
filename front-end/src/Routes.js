import React, { useContext } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import { Login } from './components/Login';
import NotFound from './components/NotFound';
import { Profile } from './components/Profile';
import Register from './components/Register';
import { UserContext } from './context/userContext';
import { Currencies } from './ressources/currencies/CurrenciesWidget';
import { Feeds } from './ressources/feeds/FeedsWidget';

export const Routes = () => {
    const {user} = useContext(UserContext);

    const routes = [
        {
            path: '/',
            component: Currencies,
            role: ['', 'ROLE_USER', 'ROLE_ADMIN']
        },
        {
            path: '/feeds',
            component: Feeds,
            role: ['', 'ROLE_USER', 'ROLE_ADMIN']
        },
        {
            path: '/login',
            component: Login,
            role: ['']
        },
        {
            path: '/register',
            component: Register,
            role: ['']
        },
        {
            path: '/profile',
            component: Profile,
            role: ['ROLE_USER', 'ROLE_ADMIN']
        },
        {
            path: '/users',
            component: Profile,
            role: ['ROLE_ADMIN']
        },
    ]

    return (
        <div>
            <Switch>
                {
                    routes.map((route, key) => {
                        if (route.role.includes(user.role)) {
                            return  <Route exact path={route.path} component={route.component} key={key}/>
                        } else {
                            return <div></div>
                        }
                    })
                }
                <Route exact path="*" component={NotFound}/>

            </Switch>
        </div>

    )

}