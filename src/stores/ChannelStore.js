import { autorun, makeAutoObservable } from 'mobx'

class ChannelStore {
    channels = [
    ];

    /*
broadcaster_type: (...)
created_at: (...)
description: (...)
followed_at: (...)
id: (...)
nickname: (...)
profile_image_url: (...)
username: (...)
    */
    
    constructor() {
        makeAutoObservable(this);
    }

    addChannel = (channel) => {
        this.channels = this.channels.concat([channel]);
    }

    delChannel = (channel) => {
        this.channels = this.channels.filter(c => c.username != channel.username);
    }
}

const channelStore = new ChannelStore();

// autorun(() => {
//     console.log(channelStore.channels);
// })

export default channelStore;