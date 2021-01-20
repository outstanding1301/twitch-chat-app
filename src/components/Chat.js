import React from 'react';

class Chat extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {chat} = this.props;
        return (
            <div>
                {chat['display-name']}({chat['username']}): {chat['message']}
            </div>
        );
    }
}

export default Chat;