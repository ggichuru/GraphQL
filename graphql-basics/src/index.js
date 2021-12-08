/**@ggichuru */
import { GraphQLServer } from "graphql-yoga";

/**
 * @TYPE_DEFINITIONS
 * @description Application schema - defines all the operations that can be performed on the api and the custom types
 */

const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`



/**
 * @RESOLVERS
 * @description Functions for each operation that can be perfomed on each api operation
 */
const resolvers = {
    Query: {
        hello() {
            return 'This is my first query'
        },
        name() {
            return 'GG'
        },
        location() {
            return 'Nairobi, Kenya'
        },
        bio() {
            return 'Software Engineer'
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