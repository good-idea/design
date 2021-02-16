/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import {Card, Hotkeys} from '@sanity/ui'
import {withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import {withCentered} from '$storybook/decorators'

export default {
  title: 'Components/Hotkeys',
  decorators: [withCentered, withKnobs],
}

export const plain = () => (
  <Card padding={4}>
    <Hotkeys keys={['Ctrl', 'Shift', 'P']} />
  </Card>
)
