import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import 'typeface-roboto';

import LabelAndButton from './LabelAndButton';
import useStyles from './styles';

import {
  onAwsCredentialsChange,
  onGithubCredentialsChange,
  onGitClone,
} from './api';

export default function OutlinedTextFields() {
  const classes = useStyles();
  const [githubUrl, setGithubUrl] = useState('');

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Grid container direction="column" spacing={3}>
        <LabelAndButton title="AWS credentials" onChange={onAwsCredentialsChange} />
        <LabelAndButton title="Github credentials" onChange={onGithubCredentialsChange} />
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
              InputLabelProps={{ shrink: true }}
              onChange={e => setGithubUrl(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              color="primary"
              variant="contained"
              component="span"
              className={classes.button}
              onClick={() => onGitClone(githubUrl)}
            >
              Clone or pull
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
