
module.exports = {
  schema: [
    {
      'https://hasura-practice.hasura.app/v1/graphql': {
        headers: {
          'x-hasura-admin-secret': 'KP4TsamvbXJRTdnDLn4LzA5uBOSAPsTQ1tFLbpvXpjEzTQ1kDUZDSiAjRKIMm27i',
        },
      },
    },
  ],
  documents: ['src/**/*.graphql'],
  overwrite: true,
  generates: {
    'src/graphql-api/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-urql'
      ],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};