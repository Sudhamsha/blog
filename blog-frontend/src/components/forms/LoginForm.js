import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import Validator from 'validator';

class LoginForm extends React.Component {
  state = {
    data: {
      email: '',
      password: '',
    },
    loading: false,
    errors: {},
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });

  handleSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false }),
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = 'Invalid Email';
    if (!data.password) errors.password = "Can't be blank!";

    return errors;
  };

  render() {
    return (
      <div className="Login-Form">
        <form>
          <TextField
            hintText="Email"
            type="email"
            name="email"
            onChange={this.onChange}
            floatingLabelText="Email"
            fullWidth={true} // eslint-disable-line
            errorText={this.state.errors.email}
          />
          <br />
          <TextField
            hintText="Password"
            floatingLabelText="Password"
            fullWidth={true} // eslint-disable-line
            type="password"
            name="password"
            onChange={this.onChange}
            errorText={this.state.errors.password}
          />
          <div className="Login-Actions">
            <FlatButton
              label="Login"
              primary={true} //eslint-disable-line
              onClick={this.handleSubmit}
            />
          </div>
        </form>
        <Snackbar
          open={this.state.errors.global ? this.state.errors.global : false}
          message={this.state.errors.global ? this.state.errors.global : ''}
          autoHideDuration={4000}
          bodyStyle={{backgroundColor: "red"}}
        />
      </div>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
};
export default LoginForm;
