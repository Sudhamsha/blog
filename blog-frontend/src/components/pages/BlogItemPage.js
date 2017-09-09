import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CardHeader, CardText } from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ArrowLeft from 'material-ui/svg-icons/navigation/arrow-back';
import { getBlogItem } from '../../actions/blog';

class BlogItemPage extends React.Component {
  state = {
    blog: {
      title: '',
      content: '',
      user: {},
    },
  };

  componentWillMount() {
    this.props
      .getBlogItem(this.props.match.params.id)
      .then(() => this.setState({ blog: this.props.blog }));
  }

  render() {
    return (
      <div>
        <FloatingActionButton
          mini={true}
          className="Arrow-Left"
          onClick={() => {
            this.props.history.push('/');
          }}
        >
          <ArrowLeft />
        </FloatingActionButton>
        <CardHeader
          title={this.state.blog.title}
          subtitle={this.state.blog.user.email}
        />
        <CardText>{this.state.blog.content}</CardText>
      </div>
    );
  }
}

BlogItemPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  getBlogItem: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    blog: state.blog,
  };
}

export default connect(mapStateToProps, { getBlogItem })(BlogItemPage);
