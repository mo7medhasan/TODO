import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { SignUp } from "../../redux/Action/AuthAction";

import { withStyles } from "@material-ui/core/styles";
import { register } from "./RegistrationStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { FormControl, Input, InputLabel, Button } from "@material-ui/core";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@material-ui/icons/VisibilityOffTwoTone";
import CloseIcon from "@material-ui/icons/Close";


const Registration = ({ classes }) => {
  const auth = useSelector((state) => state.auth);  
 const [ state,setState] =  useState({
    name: "",

    email: "",
    password: "",
    passwordConfrim: "",
    hidePassword: true,
    error: null,
    errorOpen: false,
  });


 const  errorClose = (e) => {
    setState({
      errorOpen: false,
    });
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
        setState({ ...state, [name]: value })
  };

  const passwordMatch = () => state.password === state.passwordConfrim;

 const  showPassword = () => {
    setState((prevState) => ({ hidePassword: !prevState.hidePassword }));
  };
  const  isValid = () => {
    if (state.email === "") {
      return false;
    }
    return true;
  }; 
  
  const dispatch = useDispatch()
  const submitRegistration = (e) => {
    e.preventDefault();
    if (!passwordMatch()) {
      setState({
        errorOpen: true,
        error: "Passwords don't match",
      });
    }
    const newUserCredentials = {
     name:state.name,
        email: state.email,

      password: state.password,
      passwordConfrim: state.passwordConfrim,
    };
    // dispath to userActions
    dispatch(SignUp(newUserCredentials));
    console.log("props.newUserCredentials", newUserCredentials);
  };

  
 
    return (
      <div className={classes.main}>
        <CssBaseline />

        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PeopleAltIcon className={classes.icon} />
          </Avatar>
          <form
            className={classes.form}
            onSubmit={() => submitRegistration}
          >
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="name" className={classes.labels}>
                Full name
              </InputLabel>
              <Input
                name="name"
                type="text"
                autoComplete="name"
                className={classes.inputs}
                disableUnderline={true}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="email" className={classes.labels}>
                e-mail
              </InputLabel>
              <Input
                name="email"
                type="email"
                autoComplete="email"
                className={classes.inputs}
                disableUnderline={true}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="password" className={classes.labels}>
                password
              </InputLabel>
              <Input
                name="password"
                autoComplete="password"
                className={classes.inputs}
                disableUnderline={true}
                onChange={handleChange}
                type={state.hidePassword ? "password" : "input"}
                endAdornment={
                  state.hidePassword ? (
                    <InputAdornment position="end">
                      <VisibilityOffTwoToneIcon
                        fontSize="default"
                        className={classes.passwordEye}
                        onClick={showPassword}
                      />
                    </InputAdornment>
                  ) : (
                    <InputAdornment position="end">
                      <VisibilityTwoToneIcon
                        fontSize="default"
                        className={classes.passwordEye}
                        onClick={showPassword}
                      />
                    </InputAdornment>
                  )
                }
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="passwordConfrim" className={classes.labels}>
                confrim password
              </InputLabel>
              <Input
                name="passwordConfrim"
                autoComplete="passwordConfrim"
                className={classes.inputs}
                disableUnderline={true}
                onClick={state.showPassword}
                onChange={handleChange}
                type={state.hidePassword ? "password" : "input"}
                endAdornment={
                  state.hidePassword ? (
                    <InputAdornment position="end">
                      <VisibilityOffTwoToneIcon
                        fontSize="default"
                        className={classes.passwordEye}
                        onClick={showPassword}
                      />
                    </InputAdornment>
                  ) : (
                    <InputAdornment position="end">
                      <VisibilityTwoToneIcon
                        fontSize="default"
                        className={classes.passwordEye}
                        onClick={showPassword}
                      />
                    </InputAdornment>
                  )
                }
              />
            </FormControl>
            <Button
              disabled={!isValid()}
              disableRipple
              fullWidth
              variant="outlined"
              className={classes.button}
              type="submit"
              onClick={submitRegistration}
            >
              Join
            </Button>
          </form>

          {state.error ? (
            <Snackbar
              variant="error"
              key={state.error}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              open={state.errorOpen}
              onClose={errorClose}
              autoHideDuration={3000}
            >
              <SnackbarContent
                className={classes.error}
                message={
                  <div>
                    <span style={{ marginRight: "8px" }}>
                      <ErrorIcon fontSize="large" color="error" />
                    </span>
                    <span> {state.error} </span>
                  </div>
                }
                action={[
                  <IconButton
                    key="close"
                    aria-label="close"
                    onClick={errorClose}
                  >
                    <CloseIcon color="error" />
                  </IconButton>,
                ]}
              />
            </Snackbar>
          ) : null}
        </Paper>
      </div>
    );
  }


export default withStyles(register)(Registration);
