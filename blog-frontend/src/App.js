import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import HeaderBlock from './components/blocks/HeaderBlock';
import FooterBlock from './components/blocks/FooterBlock';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import AddBlogPage from './components/pages/AddBlogPage';
import AdminRoute from './Routes/AdminRoute';

const App = ({ location }) => (
  <MuiThemeProvider>
    <div>
      <HeaderBlock />
      <Paper className="Main-Paper">
        <Route location={location} path="/" exact component={HomePage} />
        <Route location={location} path="/login" exact component={LoginPage} />
        <AdminRoute
          location={location}
          path="/add-blog"
          exact
          component={AddBlogPage}
        />
      </Paper>
      <FooterBlock />
    </div>
  </MuiThemeProvider>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default App;
