import {
  ApolloClient,
  ApolloError,
  ApolloLink,
  concat,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { GraphQLError } from "graphql";

// From apollo docs https://www.apollographql.com/docs/react/networking/authentication/#header
export const createApolloClient = () => {
  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_API_ENDPOINT,
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    const userjwt = localStorage.getItem("userjwt");
    operation.setContext({
      headers: {
        authorization: userjwt ? `Bearer ${userjwt}` : "",
      },
    });

    return forward(operation);
  });

  const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
  });

  return client;
};

export const extractGraphQLErrors = (error: ApolloError) => {
  const errors = error.graphQLErrors.map((graphQLError: GraphQLError) => {
    let msg = "";
    if (graphQLError?.extensions?.exception?.data?.data[0]?.messages[0].id) {
      msg = graphQLError.extensions.exception.data.data[0].messages[0].id;
    } else {
      msg = graphQLError.message;
    }
    return `messages.api.${msg.replaceAll(/[ .:]/gi, "_")}`;
  });
  return errors;
};

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
    .catch((error: ApolloError) => {
      if (error.graphQLErrors.length > 0) {
        const errors = extractGraphQLErrors(error);
        errorCallback(errors, 1);
      } else {
        const errors = [error.message];
        errorCallback(errors, 1);
      }
    });
};
