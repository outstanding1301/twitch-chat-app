import React from 'react';
import ChatSocket from 'twitch/chatSocket';
import Chat from 'components/Chat';
import { inject, observer } from 'mobx-react';
import Colors from 'util/Colors';
import styled from 'styled-components'
import ChatSender from 'components/chatSender/ChatSender';
import { FormControlLabel, Switch } from '@material-ui/core';

const Container = styled.div`
    display: flex;
    height: calc(100vh - ${(window.clientInformation.platform === 'Win32' ? 28 : 24) + 50}px);
    flex-direction: column;
    background-color: #DDDDDD;
`;

const ChatContainer = styled.div`
    height: 100%;
    overflow-y: auto;
`;

const Widget = styled.div`
    position: fixed;
    right: 10px;
    bottom: 60px;
    opacity: 0;
    z-index: 10;
    :hover {
        opacity: 1;
    }
`;

@inject("authStore")
@observer
class ChatroomPage extends React.Component {
    chatSocket;
    connectedRoom;

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            chats: [],
            autoScroll: true,
        }
    }

    appendChat(chat) {
        const { chats } = this.state;
        this.setState({
            chats: chats.concat(chat)
        })
        console.log(`[CHAT]${chat['display-name']}(${chat['username']}): ${chat['message']}`)
        if (this.state.autoScroll)
            this.scrollToBottom();
    }

    componentDidMount() {
        if (this.props.authStore.user && this.props.authStore.token) {
            this.chatSocket = new ChatSocket(this.props.authStore.token, this.props.authStore.user);
            this.chatSocket.connect(this.props.match.params.room);
            this.chatSocket.onChat = chat => this.appendChat(chat);
            this.connectedRoom = this.props.match.params.room;
        }
    }

    componentWillUnmount() {
        if (this.chatSocket)
            this.chatSocket.close();
        this.connectedRoom = undefined;
        console.log("close");
    }

    scrollToBottom = () => {
        if (this.chatBottom)
            this.chatBottom.scrollIntoView({ behavior: "smooth" });
    }

    render() {
        if ((this.connectedRoom && this.connectedRoom !== this.props.match.params.room) 
        || (!this.chatSocket && this.props.authStore.user && this.props.authStore.token)) {
            console.log("방 변경");
            if (this.chatSocket) {
                this.chatSocket.close();
                console.log("소켓껐음");
            }

            this.setState({chats: []});
            
            this.chatSocket = new ChatSocket(this.props.authStore.token, this.props.authStore.user);
            this.chatSocket.connect(this.props.match.params.room);
            this.chatSocket.onChat = chat => this.appendChat(chat);
            this.connectedRoom = this.props.match.params.room;
            console.log("새로운 소켓에 접속");
        }
        const chats = this.state.chats.slice(Math.max(this.state.chats.length - 100, 0)).map((chat, i) => (
            <Chat key={i} chat={chat} backgroundColor={Colors[i%100]}/>
        ));
        return (
            <Container>
                <Widget>
                    <FormControlLabel
                    control={<Switch checked={this.state.autoScroll} color="primary" onChange={()=>{this.setState({autoScroll: !this.state.autoScroll})}}/>}
                    label="AutoScroll"
                    labelPlacement="top"
                    />
                </Widget>
                <ChatContainer>
                    {chats}
                    <div ref={(el) => { this.chatBottom = el; }}/>
                </ChatContainer>
                <ChatSender onSend={(msg)=>{
                    this.chatSocket.chat(msg);
                    console.log(msg);
                }}/>
            </Container>
        );
    }
}

export default ChatroomPage;