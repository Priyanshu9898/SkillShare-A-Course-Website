import { server } from '../Store.js';
import axios from 'axios';

export const getAllCourses =
  (category = '', keyword = '') =>
  async dispatch => {
    try {
      dispatch({ type: 'allCoursesRequest' });

      const config = {
        withCredentials: true,
      }
      const { data } = await axios.get(
        `${server}/courses?keyword=${keyword}&category=${category}`, config
      );
    
      dispatch({ type: 'allCoursesSuccess', payload: data.courses });


    } catch (error) {
      dispatch({
        type: 'allCoursesFail',
        payload: error.response.data.message,
      });
    }
  };

export const getCourseLectures = id => async dispatch => {
  try {
    dispatch({ type: 'getCourseRequest' });

    const config = {
        withCredentials: true,
      }


    const { data } = await axios.get(`${server}/course/${id}`,
        config
    );

    console.log(data);

    dispatch({ type: 'getCourseSuccess', payload: data.lectures });
  } catch (error) {
    dispatch({
      type: 'getCourseFail',
      payload: error.response.data.message,
    });
  }
};
