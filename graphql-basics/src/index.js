/**@ggichuru */
import { GraphQLServer } from "graphql-yoga";

/**
 * @TYPE_DEFINITIONS
 * @description Application schema - defines all the operations that can be performed on the api and the custom types

 * @Scalar_Types String, Int, Float, Boolean, ID [rep unique identiers]
 */
const typeDefs = `
    type Query {
       me: User!
       post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }
    
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`



/**
 * @RESOLVERS
 * @description Functions for each operation that can be perfomed on each api operation
 */
const resolvers = {
    Query: {
        me() {
            return {
                id: '123098',
                name: 'GG',
                email: 'gg@test.com'
            }
        },
        post() {
            return {
                id: 'p001',
                title: 'Potato Crisps',
                body: 'Potato Crisps are called chips in english, but waru in kikuyu',
                published: true
            }
        }
    }
}


/**
 * @SERVER
 */
const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log("Server running");
})