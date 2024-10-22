async function fetchUser(userId) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ id: userId, name: `User${userId}` });
        }, 100);
    });
}

async function fetchPosts(userId) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: 1, title: `Post1 of User${userId}` },
                { id: 2, title: `Post2 of User${userId}` },
            ]);
        }, 100);
    });
}

async function fetchComments(postId) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: 1, content: `Comment1 on Post${postId}` },
                { id: 2, content: `Comment2 on Post${postId}` },
            ]);
        }, 100);
    });
}

async function formatUserData(user, posts) {
    const formattedPosts = await Promise.all(posts.map(async (post) => {
        const comments = await fetchComments(post.id);
        return { ...post, comments };
    }));
    return { ...user, posts: formattedPosts };
}

async function getUsersWithPosts(userIds) {
    const usersWithPosts = [];
    userIds.forEach(async (userId) => {
        const user = await fetchUser(userId);
        const posts = await fetchPosts(userId);
        const formattedUser = await formatUserData(user, posts);
        console.log("here");
        usersWithPosts.push(formattedUser);
    });
    return usersWithPosts;
}

function deepEqual(a, b) {
    if (a === b) return true;
    if (typeof a !== typeof b) return false;
    if (typeof a === 'object' && a != null && b != null) {
        if (Array.isArray(a) !== Array.isArray(b)) return false;
        if (Array.isArray(a)) {
            if (a.length !== b.length) return false;
            for (let i = 0; i < a.length; i++) {
                if (!deepEqual(a[i], b[i])) return false;
            }
        } else {
            const keysA = Object.keys(a);
            const keysB = Object.keys(b);
            if (keysA.length !== keysB.length) return false;
            for (let key of keysA) {
                if (!deepEqual(a[key], b[key])) return false;
            }
        }
        return true;
    }
    return false;
}

(async () => {
    const userIds = Array.from({ length: 20 }, (_, i) => i + 1);
    const result = await getUsersWithPosts(userIds);
    const expected = userIds.map(userId => ({
        id: userId,
        name: `User${userId}`,
        posts: [
            {
                id: 1,
                title: `Post1 of User${userId}`,
                comments: [
                    { id: 1, content: `Comment1 on Post1` },
                    { id: 2, content: `Comment2 on Post1` }
                ]
            },
            {
                id: 2,
                title: `Post2 of User${userId}`,
                comments: [
                    { id: 1, content: `Comment1 on Post2` },
                    { id: 2, content: `Comment2 on Post2` }
                ]
            }
        ]
    }));
    console.log(result);
    console.log(expected);
    console.log(deepEqual(result, expected));
})();
