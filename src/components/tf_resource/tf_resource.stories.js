import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import TfResource from './index';

storiesOf('TfResource', module)
  .add('default', () => (
    <TfResource />
  ));
