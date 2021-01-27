import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import ChatroomPage from 'page/ChatroomPage';
import IndexPage from 'page/IndexPage';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';

import Sidebar from 'components/sidebar/Sidebar'
import { inject, observer } from 'mobx-react';
import Appbar from 'components/appbar/Appbar';
import Titlebar from 'components/titlebar/Titlebar';

import UserAPI from 'twitch/api/user';

const useStyles = { //6100c7
  root: {
    height: '100vh'
  },
  remains: {
    height: `calc(100vh - ${(window.clientInformation.platform === 'Win32' ? 28 : 24) + 50}px)`,
  },
  drawer: {
    backgroundColor: '#1F1F23',
    height: '100%'
  },
};


@inject("authStore")
@inject("channelStore")
@observer
class App extends React.Component{
  state = {
    sidebarVisible: true
  }

  constructor(props) {
    super(props);
    window.ipcRenderer.on('oauth-token', async (e, data) => {
      const {authStore, channelStore} = this.props;

      authStore.setToken(data);
      const user = await UserAPI.getUserByToken(data);
      authStore.setUser(user);

      const _follows = await UserAPI.getUserFollows(user.id, data);
      const follows = Object.values(_follows);
      follows.forEach(follow => {
        channelStore.addChannel(follow);
      })
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <Router>
        <Grid container className={classes.root}>

          <Titlebar title="🚀 Twitch Chat App" backgroundColor="#1F1F23" />
          <Appbar onMenu={()=>{this.setState({sidebarVisible: !this.state.sidebarVisible})}}/>

          <Grid container className={classes.remains}>
            {this.state.sidebarVisible && 
              <Grid item xs={2} className={classes.drawer}>
                <Sidebar />
              </Grid>
            }
            <Grid item xs={this.state.sidebarVisible ? 10 : 12}>
              <Switch>
                <Route path="/@:room" component={ChatroomPage}/>
                <Route exact path="/">
                  <IndexPage />
                </Route>
              </Switch>
            </Grid>

          </Grid>
          
        </Grid>
      </Router>
    );
  }
  
}

export default withStyles(useStyles)(App);