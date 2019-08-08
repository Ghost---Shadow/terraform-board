import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Highlight from 'react-highlight';
import Divider from '@material-ui/core/Divider';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

import './highlight.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  container: {
    width: '80%',
    margin: 'auto',
    marginTop: '2%',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const sampleBash = `
Initializing modules...
- module.security_group_rules
  Getting source "../vault-security-group-rules"

Initializing provider plugins...
- Checking for available provider plugins on https://releases.hashicorp.com...
- Downloading plugin for provider "aws" (2.22.0)...

The following providers do not have any version constraints in configuration,
so the latest version was installed.

To prevent automatic upgrades to new major versions that may contain breaking
changes, it is recommended to add version = "..." constraints to the
corresponding provider blocks in configuration, with the constraint strings
suggested below.

* provider.aws: version = "~> 2.22"

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running "terraform plan" to see
any changes that are required for your infrastructure. All Terraform commands
should now work.

If you ever set or change modules or backend configuration for Terraform,
rerun this command to reinitialize your working directory. If you forget, other
commands will detect it and remind you to do so if necessary.
`;


const FlowComponent = ({
  heading, secondaryHeading, component, isExpanded, onChange,
}) => {
  const classes = useStyles();

  return (
    <ExpansionPanel expanded={isExpanded} onChange={onChange}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography className={classes.heading}>{heading}</Typography>
        <Typography className={classes.secondaryHeading}>{secondaryHeading}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {component}
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions style={{ justifyContent: 'flex-start' }}>
        <Button variant="contained" size="small" color="primary">
          {heading}
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
};

FlowComponent.propTypes = {
  heading: PropTypes.string.isRequired,
  secondaryHeading: PropTypes.string.isRequired,
  component: PropTypes.node.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function ControlledExpansionPanels() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const flows = [
    {
      heading: 'Initialize',
      secondaryHeading: 'terraform init Successful',
      component: <Highlight className="bash">{sampleBash}</Highlight>,
    },
    {
      heading: 'Plan',
      secondaryHeading: 'Plan Successful',
      component: <Highlight className="bash">{sampleBash}</Highlight>,
    },
    {
      heading: 'Apply',
      secondaryHeading: 'Ready to apply',
      component: <Highlight className="bash">{sampleBash}</Highlight>,
    },
  ];

  const flowComponents = flows.map((step, i) => (
    <FlowComponent
      heading={step.heading}
      secondaryHeading={step.secondaryHeading}
      component={step.component}
      isExpanded={expanded === `panel${i}`}
      onChange={handleChange(`panel${i}`)}
    />
  ));

  return (
    <div className={classes.container}>
      {flowComponents}
    </div>
  );
}
