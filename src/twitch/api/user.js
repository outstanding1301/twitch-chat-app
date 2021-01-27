const axios = require('axios');

Array.prototype.division = function (n) {
    let arr = this;
    let len = arr.length;
    let cnt = Math.floor(len / n) + (Math.floor(len % n) > 0 ? 1 : 0);
    let tmp = [];

    for (let i=0; i<cnt; i++) {
       tmp.push(arr.splice(0, n)); 
    }

    return tmp;
}

async function getUserByToken(token) {
    const res = await axios.get('https://api.twitch.tv/helix/users', {
        headers: {
            'Client-ID': '8bb37iku98tks3rc0nq9cqt7bc3t7c',
            'Authorization': 'Bearer '+token
        }
    });
    const user = res.data.data[0];
    return user;
}

async function getUserByUsername(username, token) {
    const res = await axios.get('https://api.twitch.tv/helix/users?login='+username, {
        headers: {
            'Client-ID': '8bb37iku98tks3rc0nq9cqt7bc3t7c',
            'Authorization': 'Bearer '+token
        }
    });
    const user = res.data.data[0];
    return user;
}

async function getUserById(id, token) {
    const res = await axios.get('https://api.twitch.tv/helix/users?id='+id, {
        headers: {
            'Client-ID': '8bb37iku98tks3rc0nq9cqt7bc3t7c',
            'Authorization': 'Bearer '+token
        }
    });
    const user = res.data.data[0];
    return user;
}

async function getUsersById(id, token) {
    const res = await axios.get('https://api.twitch.tv/helix/users?id='+id, {
        headers: {
            'Client-ID': '8bb37iku98tks3rc0nq9cqt7bc3t7c',
            'Authorization': 'Bearer '+token
        }
    });
    const users = res.data.data;
    return users;
}

async function getUserFollows(id, token) {
    const res = await axios.get('https://api.twitch.tv/helix/users/follows?first=100&from_id='+id, {
        headers: {
            'Client-ID': '8bb37iku98tks3rc0nq9cqt7bc3t7c',
            'Authorization': 'Bearer '+token
        }
    });

    let data = res.data.data;

    let cursor = res.data.pagination.cursor;
    while (cursor) {
        const _res = await axios.get('https://api.twitch.tv/helix/users/follows?after='+cursor+'&from_id='+id, {
            headers: {
                'Client-ID': '8bb37iku98tks3rc0nq9cqt7bc3t7c',
                'Authorization': 'Bearer '+token
            }
        });
        cursor = _res.data.pagination.cursor;
        data = data.concat(_res.data.data);
    }

    let _follows = data.map(follow => {
        return {
            id: follow.to_id,
            nickname: follow.to_name,
            followed_at: follow.followed_at
        }
    });

    let follows = _follows.reduce((m, v) => {
        m[v.id] = {...v};
        return m;
    }, {});

    const params = Object.keys(follows).division(100);
    for (const param of params) {
        const users = await getUsersById(param.join('&id='), token);
        users.forEach(user => {
            follows[user.id].username = user.login;
            follows[user.id].broadcaster_type = user.broadcaster_type;
            follows[user.id].description = user.description;
            follows[user.id].profile_image_url = user.profile_image_url;
            follows[user.id].created_at = user.created_at;
        });
    }

    return follows;
}

async function getChannels(query, token) {
    const res = await axios.get('https://api.twitch.tv/helix/search/channels?live_only=true&query='+query, {
        headers: {
            'Client-ID': '8bb37iku98tks3rc0nq9cqt7bc3t7c',
            'Authorization': 'Bearer '+token
        }
    });
    const data = res.data;
    return data;
}

export default {
    getUserByToken,
    getUserByUsername,
    getUserById,
    getUsersById,
    getUserFollows,
    getChannels
}