import React from 'react';
import { AppBar, Button, IconButton, Toolbar, Typography, withStyles } from '@material-ui/core';
import { observer, inject } from "mobx-react";
import { withRouter } from 'react-router-dom';

import { Menu as MenuIcon } from '@material-ui/icons'

const useStyles = { //6100c7
    root: {
      height: '100%'
    },
    appBar: {
      height: '50px',
      backgroundColor: '#2b2b31'
    },
    title: {
      flexGrow: 1,
      '-webkit-touch-callout': 'none',
      '-webkit-user-select': 'none',
      '-khtml-user-select': 'none',
      '-moz-user-select': 'none',
      '-ms-user-select': 'none',
      'user-select': 'none',
      cursor: 'pointer'
    },
  };

@inject("authStore")
@inject("channelStore")
@observer
class Appbar extends React.Component {
    render() {
        const {history, classes, authStore, channelStore} = this.props;
        const chatRoom = channelStore.channels.filter(c => window.location.href.includes('/@'+c.username))[0];
        
        return (
            <AppBar position="static" className={classes.appBar}>
            <Toolbar variant="dense">
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.props.onMenu}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title} onClick={()=>{history.push('/')}}>
                {chatRoom ? '🚀 '+chatRoom.nickname : '🚀 Twitch Chat App'}
              </Typography>
              {
              authStore.user ?
              <Button color="inherit" onClick={()=>{authStore.setUser(undefined)}}>Logout</Button>
              :
              <Button color="inherit" onClick={()=>{window.ipcRenderer.send('request-auth')}}>Login</Button>
              }
            </Toolbar>
          </AppBar>
        )
    }
}

export default withRouter(withStyles(useStyles)(Appbar));