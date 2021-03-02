import axios from 'axios'
import {
  FETCH_PHOTOS_REQUEST,
  FETCH_PHOTOS_SUCCESS,
  FETCH_PHOTOS_FAILURE
} from './userTypes'

export const fetchPhotos = () => {
  return (dispatch) => {
    dispatch(fetchPhotosRequest())
    axios
      .get('https://jsonplaceholder.typicode.com/photos?_limit=15')
      .then(response => {
        // response.data is the PHOTOS
        const photos = response.data
        dispatch(fetchPhotosSuccess(photos))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchPhotosFailure(error.message))
      })
  }
}

export const fetchPhotosRequest = () => {
  return {
    type: FETCH_PHOTOS_REQUEST
  }
}

export const fetchPhotosSuccess = photos => {
  return {
    type: FETCH_PHOTOS_SUCCESS,
    payload: photos
  }
}

export const fetchPhotosFailure = error => {
  return {
    type: FETCH_PHOTOS_FAILURE,
    payload: error
  }
}