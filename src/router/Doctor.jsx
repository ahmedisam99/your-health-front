import { useQuery } from 'react-query';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { doctorGetMe } from 'api/doctor';
import DashboardLoading from 'components/DashboardLoading';

export default function DoctorRouter() {
  const {
    data: user,
    isLoading,
    isSuccess,
  } = useQuery('doctor-me', doctorGetMe);
  const isAuthenticated = isSuccess && !!user && user.role === 'doctor';

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (!isAuthenticated) {
    return <Redirect to='/login?as=doctor' />;
  }

  return (
    <BrowserRouter basename='/doctor'>
      <Switch>
        <Route exact path='/' component={() => <h1>دكتور</h1>} />

        <Route path='*' render={() => <Redirect to='/' />} />
      </Switch>
    </BrowserRouter>
  );
}
