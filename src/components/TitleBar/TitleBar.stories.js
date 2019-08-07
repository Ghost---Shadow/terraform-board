import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import TitleBar from './index';

const contents = [
  { title: 'Settings', component: <div>Settings component</div> },
  { title: 'Graph', component: <div>Graph component</div> },
  { title: 'Plan and Apply', component: <div>Plan and Apply component</div> },
];

storiesOf('TitleBar', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <TitleBar contents={contents} />
  ));
