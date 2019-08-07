import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import 'typeface-roboto';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const LabelAndButton = ({ title }) => {
  const classes = useStyles();

  return (
    <label htmlFor={`${title}-contained-button-file`}>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={3}>
          <Typography variant="body1" align="center">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <input
            accept="image/*"
            className={classes.input}
            id={`${title}-contained-button-file`}
            multiple
            type="file"
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
};

export default function OutlinedTextFields() {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Grid container direction="column" spacing={3}>
        <LabelAndButton title="AWS credentials" />
        <LabelAndButton title="Github credentials" />
        <Grid container direction="row" alignItems="center">
          <Grid item xs={3}>
            <TextField
              id="outlined-full-width"
              label="Git URL"
              style={{ margin: 8 }}
              placeholder="git@github.com:username/reponame.git"
              margin="normal"
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Button color="primary" component="span" className={classes.button}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
