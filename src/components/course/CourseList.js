import React, {PropTypes} from 'react';
import CourseListRow from './CourseListRow';

const CourseList = ({courses, onDelete, onSort}) => {
  return (
    <section>
      {courses && courses.length === 0 && <div className="alert alert-warning">No courses found</div>}
      {courses && courses.length > 0 &&
        <table className="table">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th onClick={onSort.bind(this, 'title')}>Title</th>
              <th onClick={onSort.bind(this, 'author')}>Author</th>
              <th onClick={onSort.bind(this, 'category')}>Category</th>
              <th onClick={onSort.bind(this, 'length')}>Length</th>
              <th onClick={onSort.bind(this, 'title')}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course =>
              <CourseListRow key={course.id} course={course} onDelete={onDelete} />
            )}
          </tbody>
        </table>
      }
    </section>
  );
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired
};

export default CourseList;
