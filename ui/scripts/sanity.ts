import createSanityClient from '@sanity/client'
import {config} from './config'

export const sanityClient = createSanityClient({
  ...config.sanity,
  useCdn: false,
})
