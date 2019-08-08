import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {
  Switch, Route, Link, HashRouter,
} from 'react-router-dom';

const TabPanel = (props) => {
  const {
    children, value, index, ...other
  } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      key={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
};

const a11yProps = index => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const TitleBar = ({ contents }) => {
  const classes = useStyles();

  const tabs = contents.map((item, index) => (
    <Tab
      key={`Tab-${item.title}`}
      {...a11yProps(index)}
      label={item.title}
      value={item.route}
      component={Link}
      to={item.route}
    />
  ));
  const routes = contents.map(item => (
    <Route key={item.title} path={item.route} render={() => item.component} />
  ));
  return (
    <HashRouter>
      <div className={classes.root}>
        <Route
          path="/"
          render={({ location }) => (
            <Fragment>
              <AppBar position="static">
                <Tabs value={location.pathname}>
                  {tabs}
                </Tabs>
              </AppBar>
              <Switch>
                {routes}
                <Route path="/" render={() => contents[0].component} />
              </Switch>
            </Fragment>
          )}
        />
      </div>
    </HashRouter>
  );
};

TitleBar.propTypes = {
  contents: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    component: PropTypes.node.isRequired,
  })).isRequired,
};

export default TitleBar;
