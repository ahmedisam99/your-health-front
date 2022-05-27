import { useQuery } from 'react-query';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { patientGetMe } from 'api/patient';
import DashboardLoading from 'components/DashboardLoading';

export default function PatientRouter() {
  const {
    data: user,
    isLoading,
    isSuccess,
  } = useQuery('patient-me', patientGetMe);
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
        <Route exact path='/' component={() => <h1>مريض</h1>} />

        <Route path='*' render={() => <Redirect to='/' />} />
      </Switch>
    </BrowserRouter>
  );
}
