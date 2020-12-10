import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import BarChartIcon from '@material-ui/icons/BarChart';


const items = [
  {
    icon: <DashboardIcon/>,
    flag: "Dashboard"
  },
  {
    icon: <ShoppingCartIcon/>,
    flag: "Crypto-monnaies"
  },
  {
    icon: <BarChartIcon/>,
    flag: "Articles"
  },
]

export const mainListItems = (
  <div>
    {
      items.map((item) => {
        return (
          <ListItem button>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.flag} />
          </ListItem>
        )
      })
    }
  </div>
);
