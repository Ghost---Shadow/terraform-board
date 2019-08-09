import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import RenderWindow from './index';
import { Loading } from './NoElements';

const defaultSample = require('./samples/default');
const groupingSample = require('./samples/grouping');
const bigSample = require('./samples/big.json');

storiesOf('RenderWindow', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <RenderWindow elements={object('elements', defaultSample)} />
  )).add('grouping', () => (
    <RenderWindow elements={object('elements', groupingSample)} />
  ))
  .add('big', () => (
    <RenderWindow elements={bigSample} />
  ));

storiesOf('Loading', module)
  .add('default', () => (
    <Loading />
  ));
