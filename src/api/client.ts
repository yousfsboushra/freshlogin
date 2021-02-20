import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GraphQLError } from "graphql";

export const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_API_ENDPOINT,
  cache: new InMemoryCache(),
});

export const executeMutation = (
  mutation: Function,
  variables: any,
  successCallback: Function,
  errorCallback: Function
) => {
  mutation({ variables })
    .then((result: any) => {
      successCallback(result, 0);
    })
    .catch((error: { graphQLErrors: Array<GraphQLError> }) => {
      if (error.graphQLErrors) {
        const errors = error.graphQLErrors.map((graphQLError: GraphQLError) => {
          if (
            graphQLError?.extensions?.exception?.data?.data[0]?.messages[0]
              .message
          ) {
            return graphQLError.extensions.exception.data.data[0].messages[0]
              .message;
          } else {
            return graphQLError.message;
          }
        });
        errorCallback(errors, 1);
      } else {
        const errors = ["Something went wrong, please try again."];
        errorCallback(errors, 1);
      }
    });
};
