import React, {PropTypes} from 'react';
import AuthorListRow from './AuthorListRow';

const AuthorList = ({authors, onDelete}) => {
  return (
    <section>
      {authors && authors.length === 0 && <div className="alert alert-warning">No authors found</div>}
      {authors && authors.length > 0 &&
        <table className="table">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>id</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {authors.map(author =>
              <AuthorListRow key={author.id} author={author} onDelete={onDelete} />
            )}
          </tbody>
        </table>
      }
    </section>
  );
};

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default AuthorList;
