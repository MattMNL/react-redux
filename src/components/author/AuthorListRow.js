import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const AuthorListRow = ({author, onDelete}) => {
  return (
    <tr>
      <td>
        <Link to={'/author/' + author.id}>{author.firstName} {author.lastName}</Link>
      </td>
      <td>
        {author.id}
      </td>
      <td>
        {author.firstName}
      </td>
      <td>
        {author.lastName}
      </td>
      <td className="text-center">
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={onDelete.bind(this, author)}>
          <span aria-hidden="true">&times;</span>
        </button>
      </td>
    </tr>
  );
};

AuthorListRow.propTypes = {
  author: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default AuthorListRow;
