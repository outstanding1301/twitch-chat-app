import { autorun, makeAutoObservable } from 'mobx'

class ChannelStore {
    channels = [
        {username: 'aba4647', nickname: '랄로'},
        {username: 'paka9999', nickname: '파카'},
    ];
    
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

autorun(() => {
    console.log(channelStore.channels);
})

export default channelStore;