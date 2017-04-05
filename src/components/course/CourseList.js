import React, {PropTypes} from 'react';
import CourseListRow from './CourseListRow';

const CourseList = ({courses, onDelete}) => {
  return (
    <section>
      {courses && courses.length === 0 && <div className="alert alert-warning">No courses found</div>}
      {courses && courses.length > 0 &&
        <table className="table">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Length</th>
              <th>Delete</th>
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
  onDelete: PropTypes.func.isRequired
};

export default CourseList;
