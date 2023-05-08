import { lazy } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';

// import MonthPage from './pages/MonthPage';
const MonthPage = lazy(() => import('./components/MonthPage'));

import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <div className="App">
        <Switch>
          {user ? (
            <>
              <Route exact path="/" component={HomePage} />
              <Route
                path="/month/:year/:month"
                component={MonthPage}
                user={user}
              />
              <Route path="/settings" component={SettingsPage} />
              <Route
                path="/logout"
                render={() => {
                  auth.signOut();
                  return <Redirect to="/login" />;
                }}
              />
            </>
          ) : (
            <>
              <Route path="/login" component={LoginPage} />
              <Redirect to="/login" />
            </>
          )}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
