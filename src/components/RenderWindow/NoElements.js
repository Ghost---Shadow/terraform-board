import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
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

export const NoElements = () => (
  <Paper>
    <Typography variant="h6" gutterBottom>
      No Elements found
    </Typography>
  </Paper>
);


export const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classes.loaderConainer}>
      <CircularProgress className={classes.progress} />
    </div>
  );
};
