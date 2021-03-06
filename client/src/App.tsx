import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import {Room} from './pages/Room';
import AdminRoom from './pages/AdminRoom';

function App() {
  
  return (
    <Router>
      <AuthContextProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/rooms/new" component={NewRoom} />
          <Route exact path="/rooms/:id" component={Room} />

          <Route exact path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
