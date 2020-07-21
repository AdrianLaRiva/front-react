import React from 'react';
import {BrowserRouter, Switch} from 'react-router-dom';
import PrivateRoute from './config/routes/privateRoute.Component';
import PublicRoute from  './config/routes/publicRoute.Component';
import AuthContextProvider from './context/AuthContext';
import CotizacionesPage from './components/pages/cotizacionesPage';
import LoginForm from './components/pages/loginPage';
const App = () => (
	<BrowserRouter>
		<Switch>
			<AuthContextProvider>
				<PublicRoute exact path="/" component={LoginForm}/>
				<PrivateRoute  path="/cotizaciones" component={CotizacionesPage}/>
			</AuthContextProvider>
		</Switch>
  </BrowserRouter>
)

export default App;
