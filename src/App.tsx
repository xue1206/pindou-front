import React from 'react';
import { Provider, useSelector } from 'react-redux';
import store from './store';
import Header from './components/Header';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import New from './views/new';
import All from './views/all';
import { selectors } from './store/modules/material';

const App: React.FC = () => {
  const background = useSelector(selectors.background);
  return (
    <div className="main" style={{background: background || '#123456'}}>
      <BrowserRouter>
        <Header></Header>
        <main className="content">
          <Switch>
            <Route path="/new"><New></New></Route>
            <Route path="/all"><All></All></Route>
            <Redirect to="/new"></Redirect>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
};
