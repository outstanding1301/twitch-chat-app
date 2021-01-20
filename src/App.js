import Chatroom from './components/Chatroom';

function App() {
  return (
    <Chatroom room="aba4647" oauth={process.env.REACT_APP_OAUTH_KEY || ""}/>
  );
}

export default App;
