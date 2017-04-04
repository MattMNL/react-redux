import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';

const Header = ({loading}) => {
  return (
    <nav className="navbar navbar-toggleable-md navbar-light bg-faded mb-4">
      <h1 className="navbar-brand" href="#">Pluralsight Administration</h1>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <IndexLink to="/" className="nav-link" activeClassName="active">Home</IndexLink>
          </li>
          <li className="nav-item">
            <IndexLink to="/courses" className="nav-link" activeClassName="active">Courses</IndexLink>
          </li>
          <li className="nav-item">
            <IndexLink to="/about" className="nav-link" activeClassName="active">About</IndexLink>
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

export default Header;
