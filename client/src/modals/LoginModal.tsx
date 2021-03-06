/* eslint no-use-before-define: 0 */
/* typescript-eslint no-use-before-define: 0 */
import { useState, useEffect, useRef } from "react";
// eslint-disable-next-line
import React from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";

import { login } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import { IAuthFunction } from "../types/interfaces";
import { useAppSelector } from "../components/auth/reduxHooks";
import { readBuilderProgram } from "typescript";

interface ILoginModal
{
  // eslint-disable-next-line no-unused-vars
  login : (args_0: IAuthFunction) => void,
  clearErrors : ()=>void,
}

// (args_0: IAuthFunction) => void; clearErrors: () => { type: string; }; }, ILoginModal>>'.


export const LoginModal = ({ login, clearErrors }: ILoginModal) => {
  const [modal, setModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [msg, setMsg] = useState(null);
  const isAuthenticated =
    useAppSelector((state) => {
      if (state.auth)
        return state.auth.isAuthenticated;
      });


  const error = useAppSelector((state) => state.error);
  const prevError = usePrevious(error);
  // const prevError = usePrevious(error);

  /*More info here: https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state */
  function usePrevious<T>(value: T): T {
    const ref: any = useRef<T>();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const toggle = () => {
    console.log("LoginModal, toggle,modal:" + modal);
    // Clear errors
    clearErrors();
    setModal(!modal);
  };

  useEffect(() => {
    console.log("LoginModal, useEffect called");
    // const { error, isAuthenticated } = props;
    console.log(
      "LoginModal, useEffect, error:" +
        JSON.stringify(error) +
        ", prevError:" +
        JSON.stringify(prevError)
    );

    if (error !== prevError) {
      // Check for register error
      if (error.id === "LOGIN_FAIL") {
        setMsg(error.msg.msg);
      } else {
        setMsg(null);
      }
    }

    // If authenticated, close modal
    if (modal) {
      if (isAuthenticated) {
        toggle();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const onChangeEmail = (e: { target: { name: string; value: React.SetStateAction<string>; }; }) => {
    console.log(
      "LoginModal, onChangeEmail, name:" +
        e.target.name +
        ", value:" +
        e.target.value
    );
    setEmail(e.target.value);
  };

  const onChangePassword = (e: { target: { name: string; value: React.SetStateAction<string>; }; }) => {
    console.log(
      "LoginModal, onChangePassword, name:" +
        e.target.name +
        ", value:" +
        e.target.value
    );
    setPassword(e.target.value);
  };

  const onSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };
    console.log("LoginModal, onSubmit, user.email:" + user.email);

    // Attempt to login
    // props.login(user);
    login(user);
    console.log("LoginModal, onSubmit after login, user.email:" + user.email);
  };

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Login
      </NavLink>

      <Modal isOpen={modal} toggle={toggle} style={{backgroundColor:" rgba(59, 73, 55, 1)", color: "rgba(201, 189, 187, 1)"}}>
        <ModalHeader toggle={toggle} style={{backgroundColor:"  rgba(138, 149, 143, 1)", color: "rgba(255, 255, 255, 1)"}}>Login</ModalHeader>
        <ModalBody style={{backgroundColor:" rgba(59, 73, 55, 1)", color: "rgba(138, 149, 143, 1)"}}>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={onChangeEmail}
                style={{backgroundColor:" rgba(59, 73, 55, 1)", color: "rgba(138, 149, 143, 1)"}}
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={onChangePassword}
                style={{backgroundColor:" rgba(59, 73, 55, 1)", color: "rgba(138, 149, 143, 1)"}}
              />
              <Button color="dark" style={{ marginTop: "2rem",backgroundColor:"rgba(138, 149, 143, 1)", color: "rgba(255, 255, 255, 1))" }} block>
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

// LoginModal.propTypes = {
//   // isAuthenticated: PropTypes.bool,
//   // error: PropTypes.object.isRequired,
//   login: PropTypes.func.isRequired,
//   clearErrors: PropTypes.func.isRequired,
// };

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
//   error: state.error,
// });

// function mapDispatchToProps = (dispatch) => ({
//   login: state.login,
//   clearErrors: state.clearErrors,
// });

// export default connect(mapStateToProps, { login, clearErrors })(LoginModal);

export default connect(null, { login, clearErrors })(LoginModal);
