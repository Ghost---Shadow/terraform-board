import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import TfModule from './index';

storiesOf('TfModule', module)
  .add('default', () => (
    <TfModule />
  ));
