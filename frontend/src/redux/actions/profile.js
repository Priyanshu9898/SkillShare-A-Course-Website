import { server } from "../Store.js";
import axios from 'axios';

export const updateProfile = (name, email) => async dispatch => {
  try {
    dispatch({ type: 'updateProfileRequest' });

    const config = {
        headers: {
          'Content-type': 'application/json',
        },

        withCredentials: true,
      }
    const { data } = await axios.put(
      `${server}/updateProfile`,
      {
        name,
        email,
      },
      config
    );

    dispatch({ type: 'updateProfileSuccess', payload: data.message });

  } catch (error) {
    dispatch({
      type: 'updateProfileFail',
      payload: error.response.data.message,
    });
  }
};

export const updateProfilePicture = formdata => async dispatch => {
  try {
    dispatch({ type: 'updateProfilePictureRequest' });
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    }
    
    // console.log(formdata);

    const { data } = await axios.put(
      `${server}/updateProfilePicture`,
      formdata,
      config
    );

    dispatch({ type: 'updateProfilePictureSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'updateProfilePictureFail',
      payload: error.response.data.message,
    });
  }
};

export const changePassword = (oldPassword, newPassword) => async dispatch => {
  try {
    dispatch({ type: 'changePasswordRequest' });

    // console.log(oldPassword, newPassword);

    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }

    const { data } = await axios.put(
      `${server}/changePassword`,
      {oldPassword, newPassword},

      config
    );

    dispatch({ type: 'changePasswordSuccess', payload: data.message });
    
  } catch (error) {
    dispatch({
      type: 'changePasswordFail',
      payload: error.response.data.message,
    });
  }
};

export const forgetPassword = (email) => async dispatch => {
  try {
    dispatch({ type: 'forgetPasswordRequest' });

    // console.log(email);

    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }

    const { data } = await axios.post(
      `${server}/forgetPassword`,
      {email},
      config
    );

    dispatch({ type: 'forgetPasswordSuccess', payload: data.message });

  } catch (error) {
    dispatch({
      type: 'forgetPasswordFail',
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (token, password) => async dispatch => {
  try {
    dispatch({ type: 'resetPasswordRequest' });
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }

    const { data } = await axios.put(
      `${server}/resetPassword/${token}`,
      {password},
      config
    );

    dispatch({ type: 'resetPasswordSuccess', payload: data.message });

  } catch (error) {
    dispatch({
      type: 'resetPasswordFail',
      payload: error.response.data.message,
    });
  }
};

export const addToPlaylist = (id) => async dispatch => {
  try {
    dispatch({ type: 'addToPlaylistRequest' });

    console.log(id);
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }


    const { data } = await axios.post(
      `${server}/addtoplaylist`,
      {id},
      config
    );

    dispatch({ type: 'addToPlaylistSuccess', payload: data.message });
    
  } catch (error) {
    dispatch({
      type: 'addToPlaylistFail',
      payload: error.response.data.message,
    });
  }
};

export const removeFromPlaylist = id => async dispatch => {
  try {
    dispatch({ type: 'removeFromPlaylistRequest' });

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.delete(
      `${server}/removefromplaylist?id=${id}`,
      config
    );

    dispatch({ type: 'removeFromPlaylistSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'removeFromPlaylistFail',
      payload: error.response.data.message,
    });
  }
};
