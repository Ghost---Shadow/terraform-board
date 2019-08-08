import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import useStyles from './styles';

const LabelAndButton = ({ title, onChange }) => {
  const classes = useStyles();
  const targetId = `${title}-contained-button-file`;
  return (
    <label htmlFor={targetId}>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={8}>
          <Typography variant="body1" align="center">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <input
            className={classes.input}
            id={targetId}
            type="file"
            onChange={onChange}
          />
          <Button variant="contained" color="primary" component="span" className={classes.button}>
              Upload
          </Button>
        </Grid>
      </Grid>
    </label>
  );
};

LabelAndButton.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LabelAndButton;
