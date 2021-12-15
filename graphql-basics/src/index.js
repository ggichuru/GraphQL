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
        createUser(data: CreateUserInput): User!
        deleteUser(id: ID!): User!
        createPost(data: CreatePostInput): Post!
        deletePost(id: ID!): Post!
        createComment(data: CreateCommentInput): Comment!
        deleteComment(id: ID!): Comment!
    }

    input CreateUserInput {
        name: String!
        email: String!
        age: Int
    }

    input CreatePostInput {
        title: String!
        body: String!
        published: Boolean!
        author: ID!
    }

    input CreateCommentInput {
        comment: String!
        author: ID!
        post: ID!
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
let users = [{
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
let posts = [
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
        published: true,
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
let comments = [
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
            const emailTaken = users.some((user) => user.email == args.data.email)

            if (emailTaken) {
                throw new Error('Email already taken')
            }

            const user = {
                id: uuidv4(),
                ...args.data
            }
            users.push(user)

            return user
        },
        deleteUser: (parent, args, ctx, info) => {
            const userIndex = users.findIndex((user) => user.id === args.id)

            if (userIndex === -1) {
                throw new Error('User not found')
            }

            const deletedUsers = users.splice(userIndex, 1)

            posts = posts.filter((post) => {
                const match = post.author === args.id

                if (match) {
                    comments = comments.filter((comment) => comment.post !== post.id)
                }

                return !match
            })

            comments = comments.filter((comment) => comment.author !== args.id)

            return deletedUsers[0]
        },
        createPost: (parent, args, ctx, info) => {
            const userExists = users.some((user) => user.id === args.data.author)

            if (!userExists) {
                throw new Error('User not found')
            }

            const post = {
                id: uuidv4(),
                ...args.data
            }

            posts.push(post)

            return post
        },
        deletePost: (parent, args, ctx, info) => {
            const postIndex = posts.findIndex((post) => post.id === args.id)

            if (postIndex === -1) {
                throw new Error('Post not found')
            }

            const deletedPosts = posts.splice(postIndex, 1)

            comments = comments.filter((comment) => comment.post !== args.id)

            return deletedPosts[0]
        },
        createComment: (parent, args, ctx, info) => {
            const userExists = users.some((user) => user.id === args.data.author)

            if (!userExists) {
                throw new Error('User not found')
            }

            const isPublishedPost = posts.some((post) => post.id === args.data.post && post.published)

            if (!isPublishedPost) {
                throw new Error('Either posts does not exist or is not published')
            }

            const comment = {
                id: uuidv4(),
                ...args.data
            }

            comments.push(comment)

            return comment
        },
        deleteComment: (parent, args, ctx, info) => {
            const commentIndex = comments.findIndex((comment) => comment.id === args.id)

            if (commentIndex === -1) {
                throw new Error('Comment not found')
            }

            const deletedComments = comments.splice(commentIndex, 1)

            return deletedComments[0]
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