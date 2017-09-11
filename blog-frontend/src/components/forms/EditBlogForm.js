import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import PropTypes from 'prop-types';

class EditBlogForm extends React.Component {
  state = {
    data: {
      title: this.props.blog.title,
      content: this.props.blog.content,
      _id: this.props.blog._id,
      user: this.props.user,
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
            value={this.state.data.title}
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
            value={this.state.data.content}
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
          label="Update"
          onClick={this.handleSubmit}
        />
        <Snackbar
          open={this.state.errors.global ? this.state.errors.global : false}
          message={this.state.errors.global ? this.state.errors.global : ''}
          autoHideDuration={4000}
          bodyStyle={{ backgroundColor: 'red' }}
        />
      </form>
    );
  }
}

EditBlogForm.propTypes = {
  submit: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(EditBlogForm);
