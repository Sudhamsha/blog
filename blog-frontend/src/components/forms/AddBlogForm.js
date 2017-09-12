import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';

const categories = ['development', 'mern', 'testing', 'sud'];

class AddBlogForm extends React.Component {
  state = {
    data: {
      title: '',
      content: '',
      user: this.props.user,
      categories: [],
    },
    loading: false,
    errors: {},
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });

  onSelectChange = (e, i, values) => {
    this.setState({
      data: { ...this.state.data, categories: values },
    });
  };

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

  menuItems = values => {
    return categories.map(name => (
      <MenuItem
        key={name}
        insetChildren={true}
        checked={values && values.indexOf(name) > -1}
        value={name}
        primaryText={name}
      />
    ));
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
            fullWidth
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
            multiLine
            fullWidth
            onChange={this.onChange}
            errorText={this.state.errors.content}
          />
        </div>
        <div>
          <SelectField
            multiple={true}
            fullWidth
            name="categories"
            hintText="Category"
            value={this.state.data.categories}
            onChange={this.onSelectChange}
          >
            {this.menuItems(this.state.data.categories)}
          </SelectField>
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
          bodyStyle={{ backgroundColor: 'red' }}
        />
      </form>
    );
  }
}

AddBlogForm.propTypes = {
  submit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(AddBlogForm);
