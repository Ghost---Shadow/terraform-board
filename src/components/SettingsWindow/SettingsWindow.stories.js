import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import SettingsWindow from './index';

storiesOf('SettingsWindow', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <SettingsWindow />
  ));
