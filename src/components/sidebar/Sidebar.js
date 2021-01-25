import React from 'react';
import { Grid, List, ListItem, ListItemText, makeStyles, Typography, withStyles } from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore'
import { observer, inject } from "mobx-react";
import { Link, withRouter } from 'react-router-dom';

const useStyles = {
    root: {
        height: '100vh'
    },
    drawer: {
        backgroundColor: '#350C35',
        height: '100%'
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

@inject("ChannelStore")
@observer
class Sidebar extends React.Component {
    render() {
        const {history, classes} = this.props;

        return (
            <List component="a" aria-label="nav-header">
                <ListItem button onClick={()=>{history.push('/')}}>
                    <ListItemText primary={
                        <React.Fragment>
                            <Grid container alignItems="center">
                                <Typography variant="h6" className={classes.whiteText}>
                                    Title
                                </Typography>
                                <ExpandMore className={classes.whiteIcon} />
                            </Grid>
                            <Typography variant="body2" className={classes.whiteText}>
                                @nickname
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
                    this.props.ChannelStore.channels.map(item => {
                        return (
                            <ListItem button dense onClick={()=>{history.push('/@'+item.username)}}>
                                <ListItemText primary={
                                    <Typography variant="body2" className={classes.greyText}>
                                        # {item.nickname}
                                    </Typography>
                                }/>
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    }
}

export default withRouter(withStyles(useStyles)(Sidebar));