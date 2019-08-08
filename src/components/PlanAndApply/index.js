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

import {
  getTerraformInit,
  getTerraformPlan,
  getTerraformApply,
} from './api';

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

const FlowComponent = ({
  heading, secondaryHeading,
  component, isExpanded, onChange,
  resetText, updateText, onDone,
  apiCall,
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
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => {
            resetText();
            apiCall(updateText, onDone);
          }}
        >
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
  resetText: PropTypes.func.isRequired,
  updateText: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  apiCall: PropTypes.func.isRequired,
};

const secondaryHeadings = ['Pending', 'Done'];

const PlanAndApply = () => {
  const classes = useStyles();

  const [initText, setInitState] = React.useState('');
  const [planText, setPlanState] = React.useState('');
  const [applyText, setApplyState] = React.useState('');
  const [secondaryHeadingState, setSecondaryHeadingState] = React.useState({
    init: 0, plan: 0, apply: 0,
  });

  const [expanded, setExpanded] = React.useState('');

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const updateInitText = newValue => setInitState(last => `${last} ${newValue}`);
  const resetInitText = () => setInitState('');

  const updatePlanText = newValue => setPlanState(last => `${last} ${newValue}`);
  const resetPlanText = () => setPlanState('');

  const updateApplyText = newValue => setApplyState(last => `${last} ${newValue}`);
  const resetApplyText = () => setApplyState('');

  const flows = [
    {
      heading: 'Initialize',
      secondaryHeading: secondaryHeadings[secondaryHeadingState.init],
      component: <Highlight className="bash">{initText}</Highlight>,
      resetText: resetInitText,
      updateText: updateInitText,
      onDone: () => setSecondaryHeadingState(last => ({ ...last, init: 1 })),
      apiCall: getTerraformInit,
    },
    {
      heading: 'Plan',
      secondaryHeading: secondaryHeadings[secondaryHeadingState.plan],
      component: <Highlight className="bash">{planText}</Highlight>,
      resetText: resetPlanText,
      updateText: updatePlanText,
      onDone: () => setSecondaryHeadingState(last => ({ ...last, plan: 1 })),
      apiCall: getTerraformPlan,
    },
    {
      heading: 'Apply',
      secondaryHeading: secondaryHeadings[secondaryHeadingState.apply],
      component: <Highlight className="bash">{applyText}</Highlight>,
      resetText: resetApplyText,
      updateText: updateApplyText,
      onDone: () => setSecondaryHeadingState(last => ({ ...last, apply: 1 })),
      apiCall: getTerraformApply,
    },
  ];
  const flowComponents = flows.map((step, i) => (
    <FlowComponent
      key={step.heading}
      heading={step.heading}
      secondaryHeading={step.secondaryHeading}
      component={step.component}
      isExpanded={expanded === `panel${i}`}
      onChange={handleChange(`panel${i}`)}
      resetText={step.resetText}
      updateText={step.updateText}
      onDone={step.onDone}
      apiCall={step.apiCall}
    />
  ));

  return (
    <div className={classes.container}>
      {flowComponents}
    </div>
  );
};

export default PlanAndApply;
