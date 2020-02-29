import { FETCH_CHATS, ADD_CHAT_USER, SEND_MSG, DISPLAY_CHATS } from "./types";
import axios from "axios";

const API = "message/";

export const addChatUser = user => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .put(API + user.id, user)
      .then(res => {
        dispatch({
          type: ADD_CHAT_USER,
          payload: res.data
        });
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const sendSmS = msg => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(API, msg)
      .then(res => {
        dispatch({
          type: SEND_MSG,
          payload: res.data
        });
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const fetchChats = () => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(API)
      .then(res => {
        dispatch({
          type: FETCH_CHATS,
          payload: res.data
        });
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const displayChats = chatId => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(API + chatId)
      .then(res => {
        dispatch({
          type: DISPLAY_CHATS,
          payload: res.data
        });
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};
