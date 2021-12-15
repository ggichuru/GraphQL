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

const db = {
    users,
    posts,
    comments
}

export { db as default }