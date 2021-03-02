import {
    FETCH_PHOTOS_REQUEST,
    FETCH_PHOTOS_SUCCESS,
    FETCH_PHOTOS_FAILURE
  } from './userTypes'
  
  const initialState = {
    photos: [],
    loading: false,
    error: ''
  }
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PHOTOS_REQUEST:
        return {
          ...state,
          loading: true
        }
      case FETCH_PHOTOS_SUCCESS:
        return {
          loading: false,
          photos: [...state.photos , ...action.payload],//photos: [...state.photos ,action.payload]
          error: ''
        }
      case FETCH_PHOTOS_FAILURE:
        return {
          loading: false,
          photos: [],
          error: action.payload
        }
      default: return state
    }
  }
  
  export default reducer