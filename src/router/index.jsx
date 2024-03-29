import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import LoginView from 'views/public/Login';
import SignupView from 'views/public/Signup';
import HomeView from 'views/public/Home';
import AboutView from 'views/public/About';
import CrewView from 'views/public/Crew';
import ContactView from 'views/public/Contact';
import DoctorRouter from './Doctor';
import PatientRouter from './Patient';
import AdminRouter from './Admin';

export default function Router() {
  return (
    <BrowserRouter basename='/'>
      <Switch>
        <Route exact path='/' component={HomeView} />
        <Route exact path='/login' component={LoginView} />
        <Route exact path='/signup' component={SignupView} />
        <Route exact path='/contact' component={ContactView} />
        <Route exact path='/crew' component={CrewView} />
        <Route exact path='/about' component={AboutView} />
        <Route path='/admin' component={AdminRouter} />
        <Route path='/doctor' component={DoctorRouter} />
        <Route path='/patient' component={PatientRouter} />

        <Route path='*' render={() => <Redirect to='/' />} />
      </Switch>
    </BrowserRouter>
  );
}
