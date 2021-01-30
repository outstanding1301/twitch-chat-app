import { Button, TextField } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components'
import SendIcon from '@material-ui/icons/Send';

const Container = styled.div`
    display: flex;
    padding: 5px;
    background-color: #ffffff;
    border-top: 1px solid #333333;
`;

class ChatSender extends React.Component {
    state = {
        hover: false,
        message: "",
    }

    render() {
        const {onSend, channel} = this.props;
        return (
            <Container>
                <TextField 
                placeholder="채팅을 입력하세요..." 
                value={this.state.message} 
                onChange={(e) => {this.setState({message: e.target.value})}} 
                style={{marginLeft: 10, marginRight: 10}} 
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        onSend(this.state.message);
                        this.setState({message: ""});
                        e.preventDefault();
                    }
                }}
                fullWidth multiline/>
                <Button variant="contained" color='primary'>
                    <SendIcon/>
                </Button>
            </Container>
        );
    }
}

export default ChatSender;
