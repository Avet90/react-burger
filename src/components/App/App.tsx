import React from 'react';

import AppHeader from '../AppHeader/AppHeader';
import appStyles from '../App/App.module.css'


class App extends React.Component {
  render() {
    return(
      <div className={appStyles.page}>
        <AppHeader />
        <section className={appStyles.wrapper}>
        </section>
      </div>
    )
  }
}

export default App;
