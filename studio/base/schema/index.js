import schemaTypes from 'all:part:@sanity/base/schema-type'
import createSchema from 'part:@sanity/base/schema-creator'

import {apiFunction, apiInterface, apiPackage} from './api'
import {article} from './article'
import {machine} from './machine'
import {nav, navItem} from './nav'
import {perfTestRun} from './perf'
import {screen, screenSections} from './screen'
import {seo} from './seo'
import {settings} from './settings'

export default createSchema({
  name: 'sanity-design-studio',
  types: schemaTypes.concat([
    apiFunction,
    apiInterface,
    apiPackage,
    article,
    machine,
    nav,
    navItem,
    perfTestRun,
    ...screenSections,
    screen,
    seo,
    settings,
  ]),
})
