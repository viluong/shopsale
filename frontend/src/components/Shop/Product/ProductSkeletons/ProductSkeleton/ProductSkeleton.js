import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Skeleton } from "@material-ui/lab";

import Link from 'components/UI/Link/Link';
import classes from './ProductSkeleton.module.css';

const productSkeleton = () => {
  return (
    <Link href="/">
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.imageProduct}
          >
            <Skeleton animation="wave" width="100%" height="100%"/>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              <Skeleton animation="wave"/>

            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <Skeleton animation="wave"/>
          </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}

export default productSkeleton;