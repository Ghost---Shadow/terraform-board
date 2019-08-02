import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import TfModule from './index';

storiesOf('TfModule', module)
  .add('default', () => (
    <svg viewBox="0 0 1000 1000">
      <TfModule x={100} y={100} w={200} h={100}>
        <TfModule x={50} y={100} w={200} h={100} color="#3f3" />
        <TfModule x={150} y={100} w={200} h={100} color="#33f" />
      </TfModule>
    </svg>
  ));
