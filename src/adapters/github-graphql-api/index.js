import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    gql
  } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


 const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_GITHUB_URL,
});

 const authLink = setContext((_, { headers }) => {
  const token = process.env.REACT_APP_TOKEN;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export function getTopicInfo(name){
    return client
      .query({
        query: gql`
            query {
              topic(name:"${name}") {
                id
                name
                stargazerCount
                relatedTopics {
                  name
                }
                stargazers{
                    totalCount
                }
              }
            }
          `,
      })
}
