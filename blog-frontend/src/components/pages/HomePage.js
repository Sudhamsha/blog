import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { getAllBlogs } from '../../actions/blog';

class Homepage extends React.Component {
  state = {
    blogs: [],
  };
  componentDidMount() {
    this.props
      .getAllBlogs()
      .then(() => this.setState({ blogs: this.props.newBlogs }));
  }
  render() {
    return (
      <div>
        {this.state.blogs.map(blog => (
          <Card key={blog._id} className="Blog-Card">
            <CardHeader
              title={blog.title}
              subtitle={blog.user.email}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>{blog.content}</CardText>
          </Card>
        ))}
      </div>
    );
  }
}

Homepage.propTypes = {
  getAllBlogs: PropTypes.func.isRequired,

};

function mapStateToProps(state) {
  return {
    newBlogs: state.blog,
  };
}

export default connect(mapStateToProps, { getAllBlogs })(Homepage);
