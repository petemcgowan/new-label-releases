/* eslint no-use-before-define: 0 */
import { useEffect, useState, useRef } from "react";
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
import PropTypes from "prop-types";
import { register } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import { useAppSelector } from "../components/auth/reduxHooks";
import { IAuthFunction } from "../types/interfaces";

interface IRegisterModal
{
  // eslint-disable-next-line no-unused-vars
  register : (args_0: IAuthFunction) => void,
  clearErrors : ()=>void,
}


export const RegisterModal = ({ clearErrors, register }: IRegisterModal) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  // const prevErrorRef = useRef();

  const isAuthenticated = useAppSelector((state) => state.auth!.isAuthenticated);
  const error = useAppSelector((state) => state.error);
  const prevError = usePrevious(error);

  /*More info here: https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state */
  function usePrevious<T>(value: T): T {
    const ref: any = useRef<T>();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  useEffect(() => {
    // const { error, isAuthenticated } = props;
    console.log(
      "RegisterModel, useEffect, error:" +
        JSON.stringify(error) +
        ", prevError:" +
        JSON.stringify(prevError)
    );
    // prevErrorRef.current = error;
    if (error !== prevError) {
      // Check for register error
      if (error.id === "REGISTER_FAIL") {
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

  const toggle = () => {
    // Clear errors
    // props.clearErrors();
    clearErrors();
    setModal(!modal);
  };

  const onSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Create user object
    const newUser = {
      name,
      email,
      password,
    };

    // Attempt to register
    register(newUser);
  };

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Register
      </NavLink>

      <Modal isOpen={modal} toggle={toggle} style={{backgroundColor:" rgba(59, 73, 55, 1)"}}>
        <ModalHeader toggle={toggle} style={{backgroundColor:"  rgba(138, 149, 143, 1)", color: "rgba(255, 255, 255, 1)"}}>Register</ModalHeader>
        <ModalBody style={{backgroundColor:" rgba(59, 73, 55, 1)", color: "rgba(138, 149, 143, 1)"}}>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="mb-3"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                style={{backgroundColor:" rgba(255, 255, 255, 1)", color: "rgba(0, 0, 0, 1)"}}
              />

              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                style={{backgroundColor:" rgba(201, 189, 187, 1)", color: "rgba(138, 149, 143, 1)"}}
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                style={{backgroundColor:" rgba(201, 189, 187, 1)", color: "rgba(138, 149, 143, 1)"}}
              />
              <Button color="dark" style={{ marginTop: "2rem", backgroundColor:"rgba(138, 149, 143, 1)" }} block>
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
//   error: state.error,
// });
// function mapDispatchToProps = (dispatch) => ({
//   register: state.register,
//   clearErrors: state.clearErrors,
// });

RegisterModal.propTypes = {
  // isAuthenticated: PropTypes.bool,
  // error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

export default connect(null, { register, clearErrors })(RegisterModal);
