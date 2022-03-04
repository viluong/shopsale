import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LayersIcon from '@mui/icons-material/Layers';
import ImportantDevices from '@mui/icons-material/ImportantDevices';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Aux from '../../../hocs/HightAux/HightAux';
import history from '../../../configs/history';
import styles from './MainMenu.module.scss';


const MainMenu = (props) => {
  const list_menu = [
    {
      name: 'DashBoard',
      renderIconMenu: () => <DashboardIcon fontSize="inherit" fontWeight="inherit" className={styles.MenuItemIcon} />,
      link: '/dashboard',
    },
    {
      name: 'Categories',
      renderIconMenu: () => <LayersIcon fontSize="inherit" fontWeight="inherit" className={styles.MenuItemIcon} />,
      link: '/categories',
      hover: false,
      sub_menus: [
        {
          id: 'category-create',
          link: '/categories/create',
          name: 'create',
          label: 'Create'
        }
      ]
    },
    {
      name: 'Products',
      renderIconMenu: () => <ImportantDevices fontSize="inherit" fontWeight="inherit" className={styles.MenuItemIcon} />,
      link: '/products',
      hover: false,
      sub_menus: [
        {
          id: 'product-create',
          link: '/products/create',
          name: 'create',
          label: 'Create'
        }
      ]
    },
    {
      name: 'Orders',
      renderIconMenu: () => <ShoppingCart fontSize="inherit" fontWeight="inherit" className={styles.MenuItemIcon} />,
      link: '/orders',
      hover: false,
      sub_menus: [
        {
          id: 'order-create',
          link: '/orders/create',
          name: 'create',
          label: 'Create'
        }
      ]
    },
    {
      name: 'Users',
      renderIconMenu: () => <PersonIcon fontSize="inherit" fontWeight="inherit" className={styles.MenuItemIcon} />,
      link: '/users'
    }
  ]

  const [ menus, setMenus ] = React.useState(list_menu)

  const handleHover = (event, menu) => {
    let newMenus = menus
    const index = menus.findIndex((item) => item.name === menu.name)
    if(event.type === 'mouseover' && !menus[index].hover) {  
      newMenus[index] = {
        ...menus[index],
        hover: true
      }
    } 
    if (event.type === 'mouseout' && menus[index].hover) {
      newMenus[index] = {
        ...menus[index],
        hover: false
      }
    }

    
    if (newMenus[index].hover !== menu.hover) {
      setMenus([...newMenus])
    }
  }
  return (
    <div className={styles.MainMenu}>
      <Divider className={styles.MenuItemDivider} />
      <List className={styles.ListMenu} component="div">
        {
          menus.map((menu) => { 
            const isActived = history.location.pathname === menu.link ? true : false;
            console.log("isActived", isActived)
            return (
              <Aux key={menu.name}>
                <Divider className={styles.MenuItemDivider} />
                <ListItem button component="a" href={menu.link ? menu.link : '#'} 
                    underline="none" color="inherit" 
                  className={isActived ? styles.ListItemMenu  + ' ' + styles.ListItemMenuActive : styles.ListItemMenu }
                  onMouseOver={(event) => handleHover(event, menu)} 
                  onMouseOut={(event) => handleHover(event, menu)} >
                    <ListItemIcon className={styles.MenuListItemIcon} >
                      {menu.renderIconMenu()}
                    </ListItemIcon>
                    <ListItemText className={styles.MenuItemText}>
                      {menu.name}
                    </ListItemText>
                </ListItem>
              </Aux>
            )
          }
        )}
        <Divider className={styles.MenuItemDivider} />
      </List>
    </div>
  )
}

export default MainMenu