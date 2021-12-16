const Subscription = {
    comment: {
        subscribe: (parent, { postId }, { db, pubsub }, info) => {
            return pubsub.asyncIterator(`comment ${postId}`)
        }
    },

    post: {
        subscribe: (parent, args, { db, pubsub }, info) => {
            const post = db.posts.find((post) => post.published)
            if (post) {
                return pubsub.asyncIterator(`post`)
            }

            throw new Error('Post not published')
        }
    }
}

export { Subscription as default }