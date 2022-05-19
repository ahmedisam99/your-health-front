import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ContactView from 'views/Contact';
import CrewView from 'views/Crew';

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
        <Route exact path='/contact' component={ContactView} />
        <Route exact path='/crew' component={CrewView} />

        <Route path='*' render={() => <Redirect to='/' />} />
      </Switch>
    </BrowserRouter>
  );
}
