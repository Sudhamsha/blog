import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CardHeader, CardText } from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ArrowLeft from 'material-ui/svg-icons/navigation/arrow-back';
import EditIcon from 'material-ui/svg-icons/image/edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import { updateBlog, getBlogItem, deleteItem } from '../../actions/blog';
import EditBlogForm from '../forms/EditBlogForm';

class BlogItemPage extends React.Component {
  state = {
    blog: {
      title: '',
      content: '',
      user: {},
      _id: '',
    },
    isEditable: false,
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentWillMount() {
    this.props
      .getBlogItem(this.props.match.params.id)
      .then(() => this.setState({ blog: this.props.blog.data }));
  }

  componentWillReceiveProps(newProps) {
    this.setState({ blog: newProps.blog.data });
  }

  toggleUpdateForm = () => {
    this.setState({ isEditable: !this.state.isEditable });
  };

  submit = data =>
    this.props
      .updateBlog(data)
      .then(() => this.setState({ isEditable: !this.state.isEditable }));

  deleteBlog = () =>
    this.props
      .deleteItem(this.state.blog._id)
      .then(() => this.props.history.push('/'));

  render() {
      const actions = [
          <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
          />,
          <FlatButton
              label="Submit"
              onClick={this.deleteBlog}
              style={{color: '#fff'}}
              backgroundColor="#f44336"
          />,
      ];

    return (
      <div>
        <FloatingActionButton
          mini={true}
          className="Icon-Left"
          onClick={() => {
            this.props.history.push('/');
          }}
        >
          <ArrowLeft />
        </FloatingActionButton>
        {this.props.role === 'admin' && (
          <div>
            <FloatingActionButton
              mini={true}
              className="Icon-Left"
              backgroundColor="#FF9800"
              onClick={this.toggleUpdateForm}
            >
              <EditIcon />
            </FloatingActionButton>
            <FloatingActionButton
              mini={true}
              backgroundColor="#f44336"
              className="Icon-Left"
              onClick={this.handleOpen}
            >
              <DeleteIcon />
            </FloatingActionButton>
              <Dialog
                  title="Are you sure?"
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
              >
                  Please click Submit to delete.
              </Dialog>
          </div>
        )}
        {!this.state.isEditable && (
          <div>
            <CardHeader
              title={this.state.blog.title}
              subtitle={this.state.blog.user.email}
            />
            <CardText className="Display-Linebreak">
              {this.state.blog.content}
            </CardText>
          </div>
        )}

        {this.state.isEditable && (
          <div>
            <h2>Edit Blog</h2>
            <EditBlogForm blog={this.state.blog} submit={this.submit} />
          </div>
        )}
      </div>
    );
  }
}

BlogItemPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  getBlogItem: PropTypes.func.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  role: PropTypes.string,
};

BlogItemPage.defaultProps = {
  role: 'Guest',
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
    role: state.user.role,
    blog: state.blog,
  };
}

export default connect(mapStateToProps, {
  getBlogItem,
  updateBlog,
  deleteItem,
})(BlogItemPage);
