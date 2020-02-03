import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCESS
} from "./types";
import setAuthToken from "../utils/setAuthToken";
//axios.defaults.baseURL = "http://localhost:5000";

//LOAD User

const instance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*"
  },
  proxy: {
    host: "localhost",
    port: 5000
  }
});

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    console.log("Load");
    const res = await axios.get("/api/auth");
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    console.log("Load error");
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//Register User

export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    console.log("register");
    console.log(body);
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_SUCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    console.log("register error");
    const error = err.response.data.errors;

    if (error) {
      error.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

//Login User

export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    console.log("login");
    console.log(body);
    const res = await axios.post("/api/auth", body, config);
    console.log(res.data + "\n" + body);
    dispatch({
      type: LOGIN_SUCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const error = err.response.data.errors;

    if (error) {
      console.log("login Error");
      error.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};
