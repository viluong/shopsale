import React from 'react';

import Link from 'components/UI/Link/Link';
import classes from "./CarouselItem.module.css";

const carouselItem = () => {
  return (
    <div className={classes.categoryItem}>
      <Link href='/'>
        <img
          className={classes.categoryImage}
          src="https://salt.tikicdn.com/ts/category/dd/51/92/e6bc22b5ec0d6d965a93f056b7776493.png"
        />
        <div className={classes.categoryTitle}>
          Shoes
        </div>
      </Link>
    </div>
  );
}

export default carouselItem;