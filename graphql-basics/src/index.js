/**@ggichuru */
import { GraphQLServer } from "graphql-yoga";

/**
 * @TYPE_DEFINITIONS
 * @description Application schema - defines all the operations that can be performed on the api and the custom types

 * @Scalar_Types String, Int, Float, Boolean, ID [rep unique identiers]
 */
const typeDefs = `
    type Query {
        greeting(name: String, title: String): String!
        me: User!
        post: Post!
        add(a: Float!, b: Float!): Float!
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
 * 
 * @argument parent Useful while working with relational data
 * @argument args Contains the operation argument supplied
 * @argument ctx Context - useful for contextual data (logged in user id)
 * @argument info Contains great info about the actual operations sent along to the server
 * 
 * @note When using any argument always include all arguments
 */
const resolvers = {
    Query: {
        greeting(parent, args, ctx, info) {
            if (args.name && args.title) {
                return `Hello, ${args.name}. You are my favorite ${args.title}`
            } else {
                return "Hello"
            }
        },
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
        },
        add(parent, args, ctx, info) {
            return args.a + args.b
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