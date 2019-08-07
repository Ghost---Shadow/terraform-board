import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import PlanAndApply from './index';

storiesOf('PlanAndApply', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <PlanAndApply />
  ));
