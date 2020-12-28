import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Skeleton } from "@material-ui/lab";

import Link from 'components/UI/Link/Link';

const useStyles = makeStyles({
  root: {
    maxWidth: 390,
    marginTop: 5,
  },
  imageProduct: {
    height: 180,
    width: '100%'
  },
  title: {
    height: 50
  },
  body: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

const productCard = ({ product }) => {
  const classes = useStyles();
  let productDisplay = (<Link href="/">
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
    </Link>)
  if (product) {
    productDisplay = (
      <Link href={{
        pathname: `/product/${product.id}`  
      }}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.imageProduct}
              image={product.image}
              component="img"
              title={product.name}
            >
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="body2" className={classes.title}>
                {product.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.body}>
                {product.price}
                <span style={{ color: "grey" }}>Quantity: {product.quantity}</span>
            </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    )
  }
  return productDisplay;
}

export default productCard;