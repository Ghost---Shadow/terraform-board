import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import TitleBar from './index';
import SettingsWindow from '../SettingsWindow';
import PlanAndApply from '../PlanAndApply';
import RenderWindow from '../RenderWindow';

const bigSample = require('../../../server/scenarios/02_vault/json/vault-cluster/total.json');

const contents = [
  { title: 'Settings', component: <div>Settings component</div> },
  { title: 'Graph', component: <div>Graph component</div> },
  { title: 'Plan and Apply', component: <div>Plan and Apply component</div> },
];

const filled = [
  { title: 'Settings', component: <SettingsWindow /> },
  { title: 'Graph', component: <RenderWindow elements={bigSample} /> },
  { title: 'Plan and Apply', component: <PlanAndApply /> },
];

storiesOf('TitleBar', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <TitleBar contents={contents} />
  )).add('filled', () => (
    <TitleBar contents={filled} />
  ));
