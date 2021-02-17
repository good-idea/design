export const apiFunction = {
  type: 'document',
  name: 'api.function',
  title: 'Function',
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
    {
      type: 'array',
      name: 'parameters',
      title: 'Parameters',
      of: [
        {
          type: 'object',
          name: 'api.functionParameter',
          title: 'Parameter',
          fields: [
            {
              type: 'string',
              name: 'name',
              title: 'Name',
            },
            {
              type: 'array',
              name: 'tokens',
              title: 'Tokens',
              of: [
                {
                  type: 'object',
                  name: 'api.reference',
                  title: 'Reference',
                  fields: [
                    {
                      type: 'text',
                      name: 'text',
                      title: 'Text',
                    },
                    {
                      type: 'reference',
                      name: 'reference',
                      title: 'Reference',
                      to: [{type: 'api.interface'}],
                      weak: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  readOnly: true,
}
