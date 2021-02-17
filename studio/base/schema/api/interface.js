export const apiInterface = {
  type: 'document',
  name: 'api.interface',
  title: 'Interface',
  fields: [
    {
      type: 'string',
      name: 'name',
      title: 'Name',
    },
    {
      type: 'string',
      name: 'releaseTag',
      title: 'Release tag',
      options: {
        list: [
          {value: 'beta', title: 'Beta'},
          {value: 'public', title: 'Public'},
        ],
      },
    },
  ],
  readOnly: true,
}
