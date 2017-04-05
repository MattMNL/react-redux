import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';
import {connect} from 'react-redux';

const Header = ({loading, courses, authors}) => {
  return (
    <nav className="navbar navbar-toggleable-md navbar-light bg-faded mb-4">
      <h1 className="navbar-brand" href="#">Pluralsight Administration</h1>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <IndexLink to="/" className="nav-link" activeClassName="active">
              Home
            </IndexLink>
          </li>
          <li className="nav-item">
            <IndexLink to="/courses" className="nav-link" activeClassName="active">
              Courses ({courses.length})
            </IndexLink>
          </li>
          <li className="nav-item">
            <IndexLink to="/authors" className="nav-link" activeClassName="active">
              Authors ({authors.length})
            </IndexLink>
          </li>
          <li className="nav-item">
            <IndexLink to="/about" className="nav-link" activeClassName="active">
              About
            </IndexLink>
          </li>
        </ul>
        {loading &&
          <span className="pull-right">
            <LoadingDots interval={100} dots={20} />
          </span>
        }
      </div>
    </nav>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses,
    authors: state.authors
  };
}

export default connect(mapStateToProps)(Header);
