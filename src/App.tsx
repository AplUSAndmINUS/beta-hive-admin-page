import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from 'shared/stores/store';
import { adminRoutes } from 'admin-page/src/routes/admin-routes';
import { arenaRoutes } from 'enter-the-arena/src/routes/arena-routes';
import { storyRoutes } from 'story-submission/src/routes/story-routes';
import Menu from 'shared/components/menu/menu';
import ProgressBar from 'shared/components/progress-bar/progress-bar';

import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'shared/styles/_app.scss';

let routes: Array<{ path: string; element: React.ReactNode }>;
switch (process.env.REACT_APP_ENVIRONMENT) {
  case 'admin':
    routes = adminRoutes.filter((route) => route.path !== undefined) as Array<{
      path: string;
      element: React.ReactNode;
    }>;
    break;
  case 'arena':
    routes = arenaRoutes.filter((route) => route.path !== undefined) as Array<{
      path: string;
      element: React.ReactNode;
    }>;
    break;
  case 'story':
    routes = storyRoutes.filter((route) => route.path !== undefined) as Array<{
      path: string;
      element: React.ReactNode;
    }>;
    break;
  default:
    routes = [];
}

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className='App-Main'>
          <Menu routes={routes} />
          <ProgressBar />
          <Routes>
            {routes.map((route, index: number) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
