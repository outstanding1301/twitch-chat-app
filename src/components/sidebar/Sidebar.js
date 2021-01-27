import React from 'react';
import { Grid, List, ListItem, ListItemText, makeStyles, Typography, withStyles } from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore'
import { observer, inject } from "mobx-react";
import { Link, withRouter } from 'react-router-dom';

const useStyles = {
    channels: {
        height: `calc(100vh - ${(window.clientInformation.platform === 'Win32' ? 28 : 24) + 50}px)`,
        overflowY: 'scroll',
    },
    whiteText: {
        color: '#FFFFFF'
    },
    whiteIcon: {
        fill: '#FFFFFF'
    },
    greyText: {
        color: '#AEAEAE'
    },
    greyIcon: {
        color: '#AEAEAE'
    },
    categoryHeader: {
        marginTop: 20,
    },
    pageHeader: {
        padding: 20
    },
    bold: {
        fontWeight: 'bold'
    }
};

@inject("channelStore")
@inject("authStore")
@observer
class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.channelStore = this.props.channelStore;
        this.authStore = this.props.authStore;
    }
    render() {
        const {history, classes} = this.props;
        return (
            <Grid container className={classes.channels}>
            <List component="a" aria-label="nav-header">
                <ListItem button onClick={()=>{history.push('/')}}>
                    <ListItemText primary={
                        <React.Fragment>
                            <Grid container alignItems="center">
                                <Typography variant="h6" className={classes.whiteText}>
                                    {this.authStore.user ? this.authStore.user['display_name'] : '🤔'}
                                </Typography>
                            </Grid>
                            <Typography variant="body2" className={classes.whiteText}>
                                    {this.authStore.user ? '@'+this.authStore.user['login'] : '로그인을 해주세요'}
                            </Typography>
                        </React.Fragment>
                    }/>
                </ListItem>
                <ListItem button dense onClick={()=>{}}>
                    <ListItemText primary={
                        <Grid container justify="space-between">
                            <Typography variant="body2" className={classes.greyText}>
                                Channels
                            </Typography>
                        </Grid>
                    }/>
                </ListItem>
                {
                    this.channelStore.channels.map(item => {
                        return (
                            <ListItem button dense onClick={()=>{history.push('/@'+item.username)}}>
                                <ListItemText primary={
                                    <Typography variant="body2" className={window.location.href.includes('/@'+item.username) ? classes.whiteText :classes.greyText}>
                                        # {item.nickname}
                                    </Typography>
                                }/>
                            </ListItem>
                        )
                    })
                }
            </List>
            </Grid>
        )
    }
}

export default withRouter(withStyles(useStyles)(Sidebar));