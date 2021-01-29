import React from 'react';
import ChatSocket from 'twitch/chatSocket';
import Chat from 'components/Chat';
import { inject, observer } from 'mobx-react';
import Colors from 'util/Colors';

@inject("authStore")
@observer
class ChatroomPage extends React.Component {
    chatSocket;
    connectedRoom;
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            chats: []
        }
    }

    appendChat(chat) {
        const { chats } = this.state;
        this.setState({
            chats: chats.concat(chat)
        })
        console.log(`[CHAT]${chat['display-name']}(${chat['username']}): ${chat['message']}`)
        this.scrollToBottom();
    }

    componentDidMount() {
        this.chatSocket = new ChatSocket(this.props.authStore.token);
        this.chatSocket.connect(this.props.match.params.room);
        this.chatSocket.onChat = chat => this.appendChat(chat);
        this.connectedRoom = this.props.match.params.room;
        console.log(this.props.authStore.token);
    }

    componentWillUnmount() {
        this.chatSocket.close();
        this.connectedRoom = undefined;
        console.log("close");
    }

    scrollToBottom = () => {
        this.chatBottom.scrollIntoView({ behavior: "smooth" });
    }

    render() {
        if (this.connectedRoom && this.connectedRoom !== this.props.match.params.room) {
            console.log("방 변경");
            if (this.chatSocket) {
                this.chatSocket.close();
                console.log("소켓껐음");
            }

            this.setState({chats: []});
            
            this.chatSocket = new ChatSocket(this.props.authStore.token);
            this.chatSocket.connect(this.props.match.params.room);
            this.chatSocket.onChat = chat => this.appendChat(chat);
            this.connectedRoom = this.props.match.params.room;
            console.log("새로운 소켓에 접속");
        }
        const chats = this.state.chats.map((chat, i) => (
            <Chat key={i} chat={chat} backgroundColor={Colors[i%100]}/>
        ));
        return (
            <div style={{
                height: `calc(100vh - ${(window.clientInformation.platform === 'Win32' ? 28 : 24) + 50}px)`,
                overflowY: 'scroll',
            }}>
                {chats}
                <div ref={(el) => { this.chatBottom = el; }}>
                </div>
            </div>
        );
    }
}

export default ChatroomPage;