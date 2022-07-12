import { Fragment } from "react";
// eslint-disable-next-line
import React from 'react'
import { NavLink } from "reactstrap";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import PropTypes from "prop-types";


interface ILogout
{
  logout : ()=>void,
}

export const Logout = ({ logout }: ILogout) => {

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


export default connect(null, { logout } )(Logout);
