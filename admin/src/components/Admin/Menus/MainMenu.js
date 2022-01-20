import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LayersIcon from '@mui/icons-material/Layers';
import ImportantDevices from '@mui/icons-material/ImportantDevices';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MenuList from '@mui/material/MenuList';


const Item = (props) => {
  const { ...other } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '1px 8px 8px 50px',
        color: 'inherit'
      }}
      {...other}
    />
  );
}

const MainMenu = (props) => {
  const list_menu = [
    {
      name: 'DashBoard',
      renderIconMenu: () => <DashboardIcon fontSize="inherit" fontWeight="inherit" />,
      link: '/',
    },
    {
      name: 'Categories',
      renderIconMenu: () => <LayersIcon fontSize="inherit" fontWeight="inherit" />,
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
      renderIconMenu: () => <ImportantDevices fontSize="inherit" fontWeight="inherit" />,
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
      renderIconMenu: () => <ShoppingCart fontSize="inherit" fontWeight="inherit" />,
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
      renderIconMenu: () => <PersonIcon fontSize="inherit" fontWeight="inherit" />,
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
    console.log(newMenus[index].hover)
    console.log(menus[index].hover)
    console.log(menu.hover)

    
    if (newMenus[index].hover !== menu.hover) {
      setMenus([...newMenus])
    }
  }
  return ( 
    <MenuList dense>
      {
        menus.map((menu) => { return (
          <div 
            className={menu.name} 
            key={menu.name} 
            onMouseOver={(event) => handleHover(event, menu)} 
            onMouseOut={(event) => handleHover(event, menu)}
            >
            <Link href={menu.link ? menu.link : '#'} 
              underline="none" color="inherit" > 
              <MenuItem 
                sx={{
                  color: 'rgba(0, 0, 0, 0.64)',
                  fontWeight: '400',
                  fontSize: '1.200rem',
                }}>
                <ListItemIcon fontSize="inherit" fontWeight="inherit">
                  { menu.renderIconMenu() }
                </ListItemIcon>
                  {menu.name}
              </MenuItem>
            </Link>
            {
              <Box 
                component='span'
                onMouseOver={(event) => handleHover(event, menu)} 
                onMouseOut={(event) => handleHover(event, menu)}
                sx={{
                  display: menu.hover ? 'flex' : 'none',
                  flexDirection: 'column',
                  color: 'rgba(0, 0, 0, 0.54)',
                  fontWeight: '400',
                  fontSize: '1.130rem',
                  paddingTop: '5px',
                  paddingBottom: '5px',
                }}>
                { 
                  menu.sub_menus ? menu.sub_menus.map((sub_menu) => {
                    return (
                      <Item key={sub_menu.id}>                
                        <ArrowForwardIosIcon fontWeight={400} fontSize='0.830rem' />
                        <Link href={sub_menu.link ? sub_menu.link : '#'} underline="none" color="inherit"> 
                          { sub_menu.label }
                        </Link>
                      </Item> 
                    )
                  }) : ''
                }
              </Box>
            }
          </div>
        )}
      )}
    </MenuList>
  )
}

export default MainMenu