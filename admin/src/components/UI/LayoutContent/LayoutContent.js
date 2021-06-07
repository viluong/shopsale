import React from 'react';
import { Grid, Paper } from '@material-ui/core';

const LayoutContent = (props) => {
  
  const renderChildren = () => {
    if (Array.isArray(props.children)) {
      return props.children.map((child, index) => {
        return (
          <Grid key={index} item xs={child.props.xs ? child.props.xs: false} md={child.props.md ? child.props.md: false} lg={child.props.lg ? child.props.lg: false}>
            <Paper className={child.props.paperClasses ? child.props.paperClasses : ''}>
              {child}
            </Paper>
          </Grid>
        )
      })
    } else {
      return (
        <Grid item xs={props.children.props.xs ? props.children.props.xs: false} md={props.children.props.md ? props.children.props.md: false} lg={props.children.props.lg ? props.children.props.lg: false}>
          <Paper className={props.children.props.paperClasses ? props.children.props.paperClasses : ''}>
            {props.children}
          </Paper>
        </Grid>
      )
    }
  }
  return (
    <Grid container spacing={3}>
      { renderChildren() }
    </Grid>
  )
}

export default LayoutContent;