import React from 'react';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  progress: {
    margin: 'auto',
    display: 'block',
  },
  loaderConainer: {
    width: window.innerWidth,
    height: window.innerHeight,
    display: 'flex',
    alignItems: 'center',
  },
}));

export const NoElements = () => {
  const classes = useStyles();
  return (
    <div className={classes.loaderConainer}>
      <Typography className={classes.progress} variant="h6" gutterBottom>
        No terraform files found
      </Typography>
    </div>
  );
};


export const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classes.loaderConainer}>
      <CircularProgress className={classes.progress} />
    </div>
  );
};
