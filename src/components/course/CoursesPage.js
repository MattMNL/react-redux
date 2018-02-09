import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import toastr from 'toastr';
import _ from 'underscore';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.setSortKey = this.setSortKey.bind(this);
  }

  redirectToAddCoursePage() {
    if (this.props.authors.length !== 0) {
      browserHistory.push('/course');
    } else {
      if (confirm('There are no registered authors. Would you like to create one now?')) {
        browserHistory.push('/authors');
      }
    }
  }

  deleteCourse(course) {
    this.props.actions.deleteCourse(course)
      .then(() => {
        toastr.success('Course successfully deleted');
      });
  }

  setSortKey(key) {
    let sortedCourses = _.sortBy(this.props.courses, key);
    this.setState({courses: sortedCourses});
  }

  render() {
    const {courses} = this.props;

    return (
      <div>
        <h1>Courses</h1>
        <p>
          <input
            type="submit"
            value="Add Course"
            className="btn btn-primary"
            onClick={this.redirectToAddCoursePage} />
        </p>
        <CourseList courses={courses} onDelete={this.deleteCourse} onSort={this.setSortKey} />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses,
    authors: state.authors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
