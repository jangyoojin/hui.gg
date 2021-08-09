import { BrowserRouter, Route } from 'react-router-dom';
import Welcome from './Welcome';
import UserPage from './UserPage';
import Header from './Header';

function App() {
  return (
    <div style={{"height": "100%"}} className="App">
      <BrowserRouter>
        <Header />
        <Route path='/' exact component={Welcome}/>
        <Route path='/:name' component={UserPage}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
