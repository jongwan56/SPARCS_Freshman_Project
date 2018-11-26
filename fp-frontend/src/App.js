import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { SignInPage, SignUpPage } from 'pages';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={SignInPage}/>
          {/* <Switch>
            <Route path="/edit/:drive_id/:cluster_num" component={Edit}/>
            <Route path="/edit/:drive_id/:" component={Edit}/>
          </Switch> */}
          <Route exact path="/signin" component={SignInPage} />
          <Route exact path="/signup" component={SignUpPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
