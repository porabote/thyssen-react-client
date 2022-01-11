import {
  FETCH_FEED_SAMPLE_COMPONENT_DATA,
  FETCH_FEED_SAMPLE_COMPONENT_DATA_SUCCEEDED,
  FETCH_FEED_SAMPLE_COMPONENT_DATA_ERROR
} from './sample-component-types'

const fetchFeedData = () => {
  return { type: FETCH_FEED_SAMPLE_COMPONENT_DATA }
};

const fetchFeedDataSuccess = (data) => {
  return { type: FETCH_FEED_SAMPLE_COMPONENT_DATA_SUCCEEDED, payload: data }
};

const fetchFeedDataError = (error) => {
  return { type: 'FETCH_FEED_SAMPLE_COMPONENT_DATA_ERROR', payload: error }
};

export { fetchFeedData, fetchFeedDataSuccess, fetchFeedDataError }