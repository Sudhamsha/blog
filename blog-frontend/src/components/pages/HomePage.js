import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
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
                title={<FlatButton label={blog.title} primary={true} hoverColor="white" labelStyle={{paddingLeft: 0}} containerElement={<Link to={'/blog/' + blog._id}>{blog.title}</Link>} />}
              subtitle={blog.user.email}
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
