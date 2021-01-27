import React from 'react';
import Aux from 'hocs/HightAux/HightAux';

import classes from './Title.module.css';
import { Toolbar } from '@material-ui/core';

const title = (props) => {
  let styles = classes.titleCategoryWraper
  if (props.className) {
    styles = [styles, props.className].join(' ')
  }
  return (
    <Aux>
      <Toolbar variant="dense" className={styles}>
        <h4 className={classes.titleCategory}>
          {props.children}
        </h4>
      </Toolbar>
      <div style={{ backgroundColor: "rgb(0, 172, 193)", width: 200, height: 2 }}>.</div>
    </Aux>
  )
}

export default title;