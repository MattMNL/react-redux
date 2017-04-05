import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import toastr from 'toastr';
import {bindActionCreators} from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorList from './AuthorList';
import {browserHistory} from 'react-router';
import {getCoursesByAuthor} from '../../selectors/selectors';

class AuthorsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddAuthorPage = this.redirectToAddAuthorPage.bind(this);
    this.deleteAuthor = this.deleteAuthor.bind(this);
  }

  redirectToAddAuthorPage() {
    browserHistory.push('/author');
  }

  deleteAuthor(author) {
    let coursesByAuthor = getCoursesByAuthor(this.props.courses, author);
    if (coursesByAuthor.length > 0) {
      alert('Cannot delete, this author still has active courses.');
    } else {
      this.props.actions.deleteAuthor(author)
        .then(() => {
          toastr.success('Author successfully deleted');
        });
    }
  }

  render() {
    const {authors} = this.props;

    return (
      <div>
        <h1>Authors</h1>
        <p>
          <input
            type="submit"
            value="Add Author"
            className="btn btn-primary"
            onClick={this.redirectToAddAuthorPage} />
        </p>
        <AuthorList authors={authors} onDelete={this.deleteAuthor} />
      </div>
    );
  }
}

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    authors: state.authors,
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
