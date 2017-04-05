import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorForm from './AuthorForm.js';
import toastr from 'toastr';
import {authorsFormattedForDropdown} from '../../selectors/selectors';

export class ManageAuthorPage extends React.Component {
  constructor(context, props) {
    super(context, props);

    this.state = {
      author: Object.assign({}, this.props.author),
      errors: {},
      saving: false
    };

    this.updateAuthorState = this.updateAuthorState.bind(this);
    this.saveAuthor = this.saveAuthor.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.author.id !== nextProps.author.id) {
      // Necessary to populate form when existing author is loaded directly
      this.setState({
        author: Object.assign({}, nextProps.author)
      });
    }
  }

  updateAuthorState(event) {
    const field = event.target.name;
    let author = this.state.author;
    author[field] = event.target.value;
    return this.setState({author});
  }

  authorFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.author.firstName.length < 3) {
      errors.firstName = 'First name must be at least 3 character.';
      formIsValid = false;
    }

    this.setState({errors});
    return formIsValid;
  }

  saveAuthor(event) {
    event.preventDefault();

    if (!this.authorFormIsValid()) {
      return;
    }

    this.setState({
      saving: true
    });

    this.props.actions.saveAuthor(this.state.author)
      .then(() => this.redirect())
      .catch((err) => {
        toastr.error(err);
        this.stopSaving();
      });
  }

  redirect() {
    this.stopSaving();
    toastr.success('Author saved');
    this.context.router.push('/authors');
  }

  stopSaving() {
    this.setState({
      saving: false
    });
  }

  render() {
    return (
      <AuthorForm
        allAuthors={this.props.authors}
        onChange={this.updateAuthorState}
        onSave={this.saveAuthor}
        author={this.state.author}
        errors={this.state.errors}
        saving={this.state.saving} />
    );
  }
}

ManageAuthorPage.propTypes = {
  author: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageAuthorPage.contextTypes = {
  router: PropTypes.object
};

function getAuthorById(authors, id) {
  const author = authors.filter(author => author.id === id);
  if (author.length) {
    return author[0];
  }
  return null;
}

function mapStateToProps(state, ownProps) {
  const authorId = ownProps.params.id; // From the path '/author/:id'
  let author = {
    id: '',
    firstName: '',
    lastName: ''
  };

  if (authorId && state.authors.length > 0) {
    author = getAuthorById(state.authors, authorId);
  }

  return {
    author,
    authors: authorsFormattedForDropdown(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);
