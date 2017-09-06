import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddBlogForm from '../forms/AddBlogForm';
import { addNewBlog } from '../../actions/blog';

class AddBlogPage extends React.Component{

    submit = data =>
        this.props.addNewBlog(data).then(() => this.props.history.push('/'));
    render() {
        return (
            <div>
                <h2>Add Blog</h2>
                <AddBlogForm submit={this.submit}/>
            </div>

        )
    }
}

AddBlogPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    addNewBlog: PropTypes.func.isRequired,
};

export default connect(null, { addNewBlog })(AddBlogPage);