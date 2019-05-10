import {FONT_SIZE} from "./types";

export function changeFontSize(value) {
  return (dispatch, getState) => {
      dispatch(change_fontsize(value));
      return value;
    };
};

export const change_fontsize = store => {
  return {
    type: FONT_SIZE,
    payload: store
  };
};
