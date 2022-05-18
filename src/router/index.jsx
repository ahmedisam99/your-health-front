import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import HomeView from 'views/Home';
import LoginView from 'views/Login';
import SignupView from 'views/Signup';

export default function Router() {
  return (
    <BrowserRouter basename='/'>
      <Switch>
        <Route exact path='/' component={HomeView} />
        <Route exact path='/login' component={LoginView} />
        <Route exact path='/signup' component={SignupView} />

        <Route path='*' render={() => <Redirect to='/' />} />
      </Switch>
    </BrowserRouter>
  );
}
