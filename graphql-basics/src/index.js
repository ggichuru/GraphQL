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
        posts(query: String): [Post!]!
        users(query: String): [User!]!
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



// Demo user data
const users = [{
    id: '1',
    name: 'GGichuru',
    email: 'ggichuru@eg.com',
    age: 23
}, {
    id: '2',
    name: 'Tesse',
    email: 'tesse@eg.com'
}, {
    id: '3',
    name: 'Lynn',
    email: 'lynn@eg.com',
    age: 14
}]


// Demo Post data
const posts = [
    {
        id: 'p001',
        title: 'Potato Crisps',
        body: 'Potato Crisps are called chips in english, but waru in kikuyu',
        published: true
    },
    {
        id: 'p002',
        title: 'Why programming?',
        body: 'The art whose masters are fixing this world. Find out how',
        published: false
    },
    {
        id: 'p003',
        title: 'Time management',
        body: 'How to manage time properly',
        published: false
    }
]


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
        me() {
            return {
                id: '123098',
                name: 'GG',
                email: 'gg@test.com'
            }
        },
        posts: (parent, args, ctx, info) => {
            if (!args.query) {
                return posts
            }

            // filter posts by title and body
            return posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })
        },
        users: (parent, args, ctx, info) => {
            if (!args.query) {
                return users
            }

            // Filter user by name
            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
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