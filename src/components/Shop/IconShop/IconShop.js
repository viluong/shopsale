import React from 'react';
import Link from '../../UI/Link/Link';
import classes from './IconShop.module.css'

const iconShop = () => {
  return (
    <Link href="/">
      <img src="/LogoWeb.png" alt="logo web shop sale" className={classes.iconShop}></img>
    </Link>
  )
}

export default iconShop;