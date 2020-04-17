import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-unfetch'
import { getMainDefinition } from 'apollo-utilities'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'

export default function createApolloClient(initialState, ctx) {
  const httpLink = new HttpLink({
    uri: 'https://mt-polls.herokuapp.com/v1/graphql',
    fetch,
  })

  const wsLink = process.browser
    ? new WebSocketLink({
        uri: 'wss://mt-polls.herokuapp.com/v1/graphql',
        options: {
          reconnect: true,
        },
      })
    : null

  const link = process.browser
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query)
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          )
        },
        wsLink,
        httpLink
      )
    : httpLink

  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link,
    cache: new InMemoryCache().restore(initialState),
  })
}
