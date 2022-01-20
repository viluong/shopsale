import React from 'react';
import {DropzoneArea} from 'material-ui-dropzone';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(
  (theme) => ({
    previewImg: {
      height: '100%',
      width: '100%',
    },

    dropZone: {
      height: '75% !important',
      width: '70% !important',
      minHeight: '200px !important'
    },

    itemPreview: {
      height: '100%',
      width: '100%',
      display: 'contents'
    },

    rootPreview: {
      top: 0,
      height: '100%',
      width: '100%',
      position: 'absolute',
      maxWidth: '100%',
      maxHeight: '100%',
      display: 'block',
      margin: 0
    }  
  })
);

const DropDrapZone = (props) => {
  const classes = useStyles()
  const elements = {
    fullWidth: true,
    acceptedFiles: ['image/*', 'video/*', 'application/*'],
    showFileNames: false,
    showPreviewsInDropzone: true,
    filesLimit: 1,
    showAlerts: false,
    dropzoneClass: classes.dropZone,
    dropzoneText: "Upload image",
    previewGridClasses: {
      item: classes.itemPreview,
      container: classes.rootPreview,
    },
    getPreviewIcon: (file) => {
      console.log("file", file)
      if (file.file.type.split('/')[0] === 'image')
        return (
          <img className={classes.previewImg} role="presentation" src={file.data} alt="" />
        );
    },
    ...props
  }
  return (
    <DropzoneArea
      { ...elements }
    />
  )
}

export default DropDrapZone;