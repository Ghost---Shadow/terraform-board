import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  const tabs = contents.map((item, index) => (
    <Tab
      key={`Tab-${item.title}`}
      label={item.title}
      {...a11yProps(index)}
    />
  ));
  const tabPanels = contents.map((item, index) => (
    <TabPanel value={value} index={index} key={`TabPanel-${item.title}`}>
      {item.component}
    </TabPanel>
  ));
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="Title Bar">
          {tabs}
        </Tabs>
      </AppBar>
      {tabPanels}
    </div>
  );
};

TitleBar.propTypes = {
  contents: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    component: PropTypes.node.isRequired,
  })).isRequired,
};

export default TitleBar;
