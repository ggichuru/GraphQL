/**@ggichuru */
import { GraphQLServer } from "graphql-yoga";
import uuidv4 from "uuid/v4"

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
        comments: [Comment!]!
    }

    type Mutation {
        createUser(name: String!, email: String!, age: Int): User!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }
    
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }
    type Comment {
        id: ID!
        comment: String!
        author: User!
        post: Post!
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
        published: true,
        author: '1'
    },
    {
        id: 'p002',
        title: 'Why programming?',
        body: 'The art whose masters are fixing this world. Find out how',
        published: false,
        author: '2'

    },
    {
        id: 'p003',
        title: 'Time management',
        body: 'How to manage time properly',
        published: false,
        author: '1'
    },
    {
        id: 'p004',
        title: 'Time management',
        body: 'How to manage time properly',
        published: false,
        author: '3'
    }
]

// Demo comments data
const comments = [
    {
        id: 'c001',
        comment: 'This is wonderful',
        author: '1',
        post: 'p001'
    },
    {
        id: 'c002',
        comment: 'God is good',
        author: '3',
        post: 'p002'
    },
    {
        id: 'c003',
        comment: 'All the time God is marvelous',
        author: '2',
        post: 'p001'
    },
    {
        id: 'c004',
        comment: 'I am saved because He lives',
        author: '3',
        post: 'p002'
    },
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
        },
        comments: (parent, args, ctx, info) => {
            return comments
        }
    },
    Mutation: {
        createUser: (parent, args, ctx, info) => {
            const emailTaken = users.some((user) => user.email == args.email)

            if (emailTaken) {
                throw new Error('Email already taken')
            }

            const user = {
                id: uuidv4(),
                name: args.name,
                email: args.email,
                age: args.age
            }
            users.push(user)

            return user
        }
    },
    Post: {
        author: (parent, args, ctx, info) => {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        comments: (parent, args, ctx, info) => {
            return comments.filter((comment) => {
                return comment.post === parent.id
            })
        }
    },
    User: {
        posts: (parent, args, ctx, info) => {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        },
        comments: (parent, args, ctx, info) => {
            return comments.filter((comment) => {
                return comment.author === parent.id
            })
        }
    },
    Comment: {
        author: (parent, args, ctx, info) => {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        post: (parent, args, ctx, info) => {
            return posts.find((post) => {
                return post.id === parent.post
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