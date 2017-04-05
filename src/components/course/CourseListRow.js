import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const CourseListRow = ({course, onDelete}) => {
  return (
    <tr>
      <td>
        <a href={course.watchHref} target="_blank">Watch</a>
      </td>
      <td>
        <Link to={'/course/' + course.id}>{course.title}</Link>
      </td>
      <td>
        {course.authorId}
      </td>
      <td>
        {course.category}
      </td>
      <td>
        {course.length}
      </td>
      <td className="text-center">
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={onDelete.bind(this, course)}>
          <span aria-hidden="true">&times;</span>
        </button>
      </td>
    </tr>
  );
};

CourseListRow.propTypes = {
  course: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default CourseListRow;
