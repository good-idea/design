export const apiRelease = {
  type: 'document',
  name: 'api.release',
  title: 'Release',
  fields: [
    {
      type: 'string',
      name: 'version',
      title: 'Version',
    },
    {
      type: 'array',
      name: 'members',
      title: 'Members',
      of: [
        {
          type: 'reference',
          title: 'Reference',
          to: [
            {type: 'api.class'},
            {type: 'api.function'},
            {type: 'api.interface'},
            {type: 'api.typeAlias'},
            {type: 'api.variable'},
          ],
          weak: true,
        },
      ],
    },
  ],
  readOnly: true,
  preview: {
    select: {
      title: 'version',
    },
  },
}
