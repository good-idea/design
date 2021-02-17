import S from '@sanity/desk-tool/structure-builder'
import {CogIcon} from '@sanity/icons'
import documentStore from 'part:@sanity/base/datastore/document'
import React from 'react'
import {map} from 'rxjs/operators'

const STRUCTURE_CUSTOM_TYPES = [
  'api.class',
  'api.function',
  'api.interface',
  'api.package',
  'api.release',
  'api.typeAlias',
  'api.variable',
  'machine',
  'perf.testRun',
  'settings',
]

const packagesListItem = S.listItem()
  .title('Packages')
  .child(
    S.documentTypeList('api.package')
      .title('Packages')
      .child((packageId) =>
        documentStore
          .listenQuery(`*[_id == $id]{_id,name,releases[]->{_id,version}}[0]`, {
            id: packageId,
          })
          .pipe(
            map((packageDoc) => {
              if (!packageDoc) return null

              return S.list()
                .title(packageDoc.name)
                .id(packageDoc._id)
                .items(
                  packageDoc.releases.map((release) =>
                    S.listItem()
                      .title(release.version)
                      .child(
                        S.documentList()
                          .defaultOrdering([{field: 'name', direction: 'asc'}])
                          .id(release._id)
                          .title(release.version)
                          .filter(`_type != "api.package" && references("${release._id}")`)
                      )
                  )
                )
            })
          )
      )
  )

const perfListItem = S.listItem()
  .title('Performance')
  .child(
    S.list()
      .title('Performance')
      .items([
        S.listItem()
          .title('Performance test run')
          .child(S.documentTypeList('perf.testRun').title('Performance test run')),
        S.listItem().title('Machine').child(S.documentTypeList('machine').title('Machines')),
      ])
  )

// The `Settings` root list item
const settingsListItem = S.listItem()
  .title('Settings')
  .icon(() => <CogIcon data-sanity-icon />)
  .child(S.editor().id('settings').schemaType('settings').documentId('settings'))

// The default root list items (except custom ones)
const defaultListItems = S.documentTypeListItems().filter(
  (listItem) => !STRUCTURE_CUSTOM_TYPES.includes(listItem.getId())
)

export default () =>
  S.list()
    .title('Content')
    .items([
      packagesListItem,
      ...defaultListItems,
      S.divider(),
      perfListItem,
      S.divider(),
      settingsListItem,
    ])
