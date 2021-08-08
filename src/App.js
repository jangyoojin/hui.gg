import { BrowserRouter, Route } from 'react-router-dom';
import Welcome from './Welcome';
import UserHistory from './UserHistory';


const API_BASE = 'http://localhost:3001';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path='/' exact component={Welcome}/>
        <Route path='/:name' component={UserHistory}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
