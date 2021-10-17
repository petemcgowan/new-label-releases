import React, { useState, useEffect, useRef } from "react";
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
import { connect, useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

export const LoginModal = ({ login, clearErrors }) => {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.error);
  const prevError = usePrevious(error);
  // const prevError = usePrevious(error);

  /*More info here: https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state */
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

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
  }, []);

  const toggle = () => {
    console.log("LoginModal, toggle,modal:" + modal);
    // Clear errors
    clearErrors();
    setModal(!modal);
  };

  const onChangeEmail = (e) => {
    console.log(
      "LoginModal, onChangeEmail, name:" +
        e.target.name +
        ", value:" +
        e.target.value
    );
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    console.log(
      "LoginModal, onChangePassword, name:" +
        e.target.name +
        ", value:" +
        e.target.value
    );
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
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

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
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
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={onChangePassword}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
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
