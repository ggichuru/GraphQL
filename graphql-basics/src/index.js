/**@ggichuru */
import { GraphQLServer } from "graphql-yoga";

/**
 * @TYPE_DEFINITIONS
 * @description Application schema - defines all the operations that can be performed on the api and the custom types

 * @Scalar_Types String, Int, Float, Boolean, ID [rep unique identiers]
 */
const typeDefs = `
    type Query {
       title: String!
       price: Float!
       releaseYear: Int
       rating: Float
       inStock: Boolean
    }
`



/**
 * @RESOLVERS
 * @description Functions for each operation that can be perfomed on each api operation
 */
const resolvers = {
    Query: {
        title() {
            return 'Potato Crisps'
        },
        price() {
            return 230.50
        },
        releaseYear() {
            return null
        },
        rating() {
            return null
        },
        inStock() {
            return false
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