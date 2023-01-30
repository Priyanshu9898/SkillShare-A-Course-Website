import { server } from "../Store.js";
import axios from "axios";

export const loginAction = (email, password) => async dispatch => {
    try {
      dispatch({ type: 'loginRequest' });

    //   console.log(email, password);
        
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }

      const { data } = await axios.post(
        `${server}/login`,
        { email, password },
        config
      );
  
      dispatch({ type: 'loginSuccess', payload: data });
    } catch (error) {
      dispatch({ type: 'loginFail', payload: error.response.data.message });
    }
  };

  export const registerAction = (formData) => async dispatch => {
    try {
      dispatch({ type: 'registerRequest' });

    //   console.log(email, password);
        
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }

      const { data } = await axios.post(
        `${server}/register`,
        formData,
        config
      );
  
      dispatch({ type: 'registerSuccess', payload: data });
    } catch (error) {
      dispatch({ type: 'registerFail', payload: error.response.data.message });
    }
  };


export const myProfile = () => async dispatch => {
    try {
      dispatch({ type: 'loadUserRequest' });

      const config = {
        withCredentials: true,
      };
  
      const { data } = await axios.get(
        `${server}/myProfile`,
        config
        
      );

      dispatch({ type: 'loadUserSuccess', payload: data.user });
    } catch (error) {
      dispatch({ type: 'loadUserFail', payload: error.response.data.message });
    }
  };

export const logoutProfile = () => async dispatch => {

    try {
      dispatch({ type: 'logoutRequest' });

      const config = {
        withCredentials: true,
      };
  
      const { data } = await axios.get(
        `${server}/logout`,
        config
        
      );
      
      dispatch({ type: 'logoutSuccess', payload: data.user });
    } catch (error) {
      dispatch({ type: 'logoutFail', payload: error.response.data.message });
    }
  };


  export const buySubscription = () => async dispatch => {
    try {
      dispatch({ type: 'buySubscriptionRequest' });
  
      const { data } = await axios.get(`${server}/subscribe`, {
        withCredentials: true,
      });

      console.log(data);
  
      dispatch({ type: 'buySubscriptionSuccess', payload: data.subscriptionId });
    } catch (error) {
      dispatch({
        type: 'buySubscriptionFail',
        payload: error.response.data.message,
      });
    }
  };
  
  export const cancelSubscription = () => async dispatch => {
    try {
      dispatch({ type: 'cancelSubscriptionRequest' });
  
      const { data } = await axios.delete(`${server}/subscribe/cancel`, {withCredentials: true});
      // console.log(data);
      dispatch({ type: 'cancelSubscriptionSuccess', payload: data.message });
    } catch (error) {
      dispatch({
        type: 'cancelSubscriptionFail',
        payload: error.response.data.message,
      });
    }
  };
  