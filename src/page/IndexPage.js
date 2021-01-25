import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
}));

const IndexPage = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Typography variant="h1">This is index page</Typography>
        </Grid>
    )
};

export default IndexPage;