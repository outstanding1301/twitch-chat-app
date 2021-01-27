import { Button, withStyles } from '@material-ui/core';
import React from 'react';

const useStyles = {
    container: {
        display: 'flex',
        margin: '5px'
    },
    user: {
        display: 'inline-block',
        maxWidth: '300px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    chat: {
        flex: 1,
    }
};

class Chat extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {chat} = this.props;
        const {classes} = this.props;
        return (
            <div className={classes.container}>
                <div>
                <Button variant="contained" className={classes.user} style={{backgroundColor: this.props.backgroundColor, color: "#FFFFFF"}}>
                    {chat['display-name']}({chat['username']})
                </Button>
                </div>
                <div className={classes.chat}>
                <Button variant="contained" style={{backgroundColor: '#FFFFFF'}}>
                    {chat['message']}
                </Button>
                </div>
            </div>
        );
    }
}

export default withStyles(useStyles)(Chat);