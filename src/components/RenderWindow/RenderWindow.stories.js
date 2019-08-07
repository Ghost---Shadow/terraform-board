import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import RendererWindow from './index';

const defaultSample = require('./samples/default');
const groupingSample = require('./samples/grouping');
const bigSample = require('../../../server/scenarios/02_vault/json/vault-cluster/total.json');

storiesOf('RendererWindow', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <RendererWindow elements={object('elements', defaultSample)} />
  )).add('grouping', () => (
    <RendererWindow elements={object('elements', groupingSample)} />
  ))
  .add('big', () => (
    <RendererWindow elements={bigSample} />
  ));
