import React from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ChannelCard from 'components/channelCard/ChannelCard'
import { inject, observer } from 'mobx-react';

const useStyles = {
    root: {
        // height: '100%',
        height: `calc(100vh - ${(window.clientInformation.platform === 'Win32' ? 28 : 24) + 50}px)`,
        overflowY: 'scroll',
    },
    media: {

    }
};

@inject("channelStore")
@observer
class IndexPage extends React.Component {
    render() {
        const {classes} = this.props;
        const {channelStore} = this.props;

        const cards = channelStore.channels.map((c, i) => 
        // <Grid key={i} item>
            <ChannelCard channel={c} />
        // </Grid>
        )

        return (
            <Grid container className={classes.root}>
                {cards}
            </Grid>
        );
        }
}

export default withStyles(useStyles)(IndexPage);