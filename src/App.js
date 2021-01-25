import { Grid, makeStyles } from '@material-ui/core';
import ChatroomPage from 'page/ChatroomPage';
import IndexPage from 'page/IndexPage';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';

import Sidebar from 'components/sidebar/Sidebar'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  drawer: {
    backgroundColor: '#350C35',
    height: '100%'
  }
}));


function App() {
  const classes = useStyles();
  return (
    <Router>
      <Grid container className={classes.root}>
        <Grid item xs={2} className={classes.drawer}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <Switch>
            <Route path="/@:room" component={ChatroomPage}/>
            <Route exact path="/">
                  <IndexPage />
            </Route>
          </Switch>
        </Grid>
      </Grid>
    </Router>
  );
}

export default App;
