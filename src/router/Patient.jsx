import { useQuery } from 'react-query';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { patientGetMe } from 'api/patient';
import DashboardLoading from 'components/DashboardLoading';
import PatientHomeView from 'views/Patient/Home';
import PatientLogoutView from 'views/Patient/Logout';
import PatientDoctorsView from 'views/Patient/Doctors';

export default function PatientRouter() {
  const {
    data: user,
    isLoading,
    isSuccess,
  } = useQuery('pat-me', patientGetMe, {
    cacheTime: 0,
    staleTime: 0,
  });
  const isAuthenticated = isSuccess && !!user && user.role === 'patient';

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (!isAuthenticated) {
    return <Redirect to='/login?as=patient' />;
  }

  return (
    <BrowserRouter basename='/patient'>
      <Switch>
        <Route exact path='/' component={PatientHomeView} />
        <Route exact path='/doctors' component={PatientDoctorsView} />
        <Route exact path='/logout' component={PatientLogoutView} />

        <Route path='*' render={() => <Redirect to='/' />} />
      </Switch>
    </BrowserRouter>
  );
}
