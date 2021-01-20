import React from 'react';
import ChatSocket from '../twitch/chatSocket';
import Chat from './Chat';

class Chatroom extends React.Component {
    chatSocket;
    constructor(props) {
        super(props);
        this.state = {
            chats: []
        }

        this.chatSocket = new ChatSocket(this.props.oauth);
        this.chatSocket.connect(this.props.room);
        this.chatSocket.onChat = chat => this.appendChat(chat);
    }

    appendChat(chat) {
        const { chats } = this.state;
        this.setState({
            chats: chats.concat(chat)
        })
        console.log(`[CHAT]${chat['display-name']}(${chat['username']}): ${chat['message']}`)
        this.scrollToBottom();
    }

    componentWillUnmount() {
        this.chatSocket.close();
    }

    scrollToBottom = () => {
        this.chatBottom.scrollIntoView({ behavior: "smooth" });
    }

    render() {
        const chats = this.state.chats.map(chat => (
            <Chat chat={chat}/>
        ));
        return (
            <div>
                {chats}
                <div ref={(el) => { this.chatBottom = el; }}>
                </div>
            </div>
        );
    }
}

export default Chatroom;