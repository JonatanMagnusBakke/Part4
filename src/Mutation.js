import React from "react";
import { ApolloProvider, Query, Mutation } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

//Each of the examples uses their own server, you need to find the URI's for each
const client = new ApolloClient({
  uri: "https://www.jbakke.dk/mini/graphql"
});

const ADD_USER = gql`
  mutation createUser(
      $userName: String!,
      $password: String!,
      $firstName: String!,
      $lastName: String,
      $email: String!,
    ){
    createUser(
      input: {
        userName: $username
        password: $password
        firstName: $firstname
        lastName: $lastname
        email: $email
      }
    ){
      userName
      password
      firstName
      email
    }
  }
`;
const CreateUser = () => {
  let userName;
  let password;
  let firstName;
  let lastName;
  let email;

  return (
    <Mutation mutation={ADD_USER}>
      {(createUser, { data }) => (
        <div>
          ADD USER
          <form
            onSubmit={e => {
              e.preventDefault();
              createUser({ variables: {
                    userName: userName.value,
                    password: password.value, 
                    firstName: firstName.value,
                    lastName: lastName.value,
                    email: email.value 
                }});
              userName.value = "";
              password.value = "";
              firstName.value = "";
              lastName.value = "";
              email.value = "";
            }}
          >
            username
            <input ref={node => { userName = node }} />
            password
            <input ref={node => { password = node }} />
            firstname
            <input ref={node => { firstName = node }} />
            lastname
            <input ref={node => { lastName = node }} />
            email
            <input ref={node => { email = node }} />
            <button type="submit">Add User</button>
          </form>
        </div>
      )}
    </Mutation>
  );
};

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>Create </h2>
      <CreateUser/>
    </div>
  </ApolloProvider>
);

export default App;