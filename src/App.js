import styled from 'styled-components';

const StyledApp = styled.div`
  h1 {
    color: red;
  }
`;

function App() {
  return (
    <StyledApp>
        <h1>Hello World!</h1>
    </StyledApp>
  );
}

export default App;
