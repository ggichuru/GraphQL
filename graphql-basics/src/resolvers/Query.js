const Query = {
    me() {
        return {
            id: '123098',
            name: 'GG',
            email: 'gg@test.com'
        }
    },
    posts: (parent, args, { db }, info) => {
        if (!args.query) {
            return db.posts
        }

        // filter db.posts by title and body
        return db.posts.filter((post) => {
            const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
            const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
            return isTitleMatch || isBodyMatch
        })
    },
    users: (parent, args, { db }, info) => {
        if (!args.query) {
            return db.users
        }

        // Filter user by name
        return db.users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase())
        })
    },
    comments: (parent, args, { db }, info) => {
        return db.comments
    }
}

export { Query as default }