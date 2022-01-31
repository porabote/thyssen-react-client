import {
  REQUEST_DICTS,
  REQUEST_DICTS_SUCCEEDED,
  REQUEST_DICTS_ERROR
} from './dicts-types'

const requestDicts = (dictsRequired) => {
  return { type: REQUEST_DICTS, payload: { dictsRequired } }
};

const requestDictsSuccess = (data) => {
  return { type: REQUEST_DICTS_SUCCEEDED, payload: data }
};

const requestDictsError = (error) => {
  return { type: REQUEST_DICTS_ERROR, payload: error }
};

export { requestDicts, requestDictsSuccess, requestDictsError }