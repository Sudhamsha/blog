import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import HeaderBlock from './components/blocks/HeaderBlock';
import FooterBlock from './components/blocks/FooterBlock';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import AddBlogPage from './components/pages/AddBlogPage';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <HeaderBlock />
          <Paper className="Main-Paper">
              <Route path="/" exact component={HomePage} />
              <Route path="/login" exact component={LoginPage} />
              <Route path="/add-blog" exact component={AddBlogPage} />
          </Paper>
          <FooterBlock />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
