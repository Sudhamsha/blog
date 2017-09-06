import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import PropTypes from 'prop-types';

class AddBlogForm extends React.Component {
  state = {
    data: {
      title: '',
      content: '',
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
    if (!data.title) errors.title = "Can't be blank!";
    if (!data.content) errors.content = "Can't be blank!";

    return errors;
  };
  render() {
    return (
      <form>
        <div>
          <TextField
            name="title"
            type="text"
            hintText="Title"
            floatingLabelText="Title"
            fullWidth={true} // eslint-disable-line
            onChange={this.onChange}
            errorText={this.state.errors.title}
          />
        </div>
        <div>
          <TextField
            name="content"
            type="text"
            hintText="Content"
            floatingLabelText="Content"
            rows={5}
            multiLine={true} // eslint-disable-line
            fullWidth={true} // eslint-disable-line
            onChange={this.onChange}
            errorText={this.state.errors.content}
          />
        </div>
        <RaisedButton
          primary={true} // eslint-disable-line
          label="Submit"
          onClick={this.handleSubmit}
        />
          <Snackbar
              open={this.state.errors.global ? this.state.errors.global : false}
              message={this.state.errors.global ? this.state.errors.global : ''}
              autoHideDuration={4000}
              bodyStyle={{backgroundColor: "red"}}
          />
      </form>
    );
  }
}

AddBlogForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default AddBlogForm;
