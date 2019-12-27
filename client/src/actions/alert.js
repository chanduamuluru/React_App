import { SET_ALERT, REMOVE_ALERT } from "../actions/types";
import uuid from "uuid";
//Action  setAlert

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid.v4(); //version $ uuid

  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });
};
