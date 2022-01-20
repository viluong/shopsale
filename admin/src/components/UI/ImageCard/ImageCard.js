import * as React from 'react';
import CardMedia from '@mui/material/CardMedia';
import image from '../../../empty-image.jpg';

const ImageCard = (props) => {
  const url = props.url ? props.url : image; 
  return (
    <CardMedia
      component="img"
      height={props.height}
      image={url}
      alt={props.alt}
    />
  )
}

export default ImageCard