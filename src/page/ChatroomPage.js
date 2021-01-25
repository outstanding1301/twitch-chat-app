import React from 'react';
import ChatSocket from 'twitch/chatSocket';
import Chat from 'components/Chat';

class ChatroomPage extends React.Component {
    chatSocket;
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            chats: []
        }
        this.params = this.props.match.params;
        this.chatSocket = new ChatSocket(this.params.oauth || process.env.REACT_APP_OAUTH_KEY);
        this.chatSocket.connect(this.params.room);
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
            <div style={{
                height: '100vh',
                overflowY: 'scroll'
            }}>
                {chats}
                <div ref={(el) => { this.chatBottom = el; }}>
                </div>
            </div>
        );
    }
}

export default ChatroomPage;