import React from "react";
import { ApolloProvider, Query } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

//Each of the examples uses their own server, you need to find the URI's for each
const client = new ApolloClient({
    uri: "https://www.jbakke.dk/mini/graphql"
});

const GET_USERS = gql`
{
    getUsers{
      id
      userName
      firstName
      lastName
      email
    }
  }
`;

const Users = ({ onDogSelected }) => (
    <Query query={GET_USERS}>
        {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            return (
                data.getUsers.map(user => <p key={user.id}>{user.userName}</p>)
            );
        }}
    </Query>
);



class App extends React.Component {


    render() {
        return (
            <ApolloProvider client={client}>
                <div>
                    <h2>All Users</h2>
                    <Users onDogSelected={this.onDogSelected} />
                </div>
            </ApolloProvider>
        );
    }
}


export default App;