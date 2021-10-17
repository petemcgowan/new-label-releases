import React, { Fragment } from "react";
import { NavLink } from "reactstrap";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import PropTypes from "prop-types";

export const Logout = ({ logout }) => {
  // const logout = logout;

  return (
    <Fragment>
      <NavLink onClick={logout} href="#">
        Logout
      </NavLink>
    </Fragment>
  );
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

// function mapDispatchToProps(dispatch) {
//   return {
//     logout: () => {
//       dispatch(logout);
//     },
//   };
// }

export default connect(null, { logout } /*mapDispatchToProps*/)(Logout);
// export default connect(null, mapDispatchToProps)(Logout);
