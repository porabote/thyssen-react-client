import {
    GET_DATA_SUCCESS,
    GET_DATA_FAILURE,
    GET_DATA_STARTED,
    CLEAR_DATA
} from './types';

import Api from '@services/api-service'

export const getData = (query) => {
    return dispatch => {
        dispatch(getDataStarted());
        //
        // Api
        //     .get(`https://jsonplaceholder.typicode.com/todos`, {
        //         title,
        //         userId,
        //         completed: false
        //     })
        //     .then(res => {//throw new Error('NOT!');
        //         dispatch(getDataSuccess(res.data));
        //     })
        //     .catch(err => {
        //         dispatch(getDataFailure(err.message));
        //     });

        Api
            .get(`/api/spares/get/`, {
                query: {
                    where: {
                        '=': this.state.filter.left
                    },
                    include: [
                        'user'
                    ],
                    page: this.state.page
                }
            }).then((res) => {//throw new Error('NOT!');
                dispatch(getDataSuccess(res.data));
            })
            .catch(err => {
                dispatch(getDataFailure(err.message));
            });
    };
};

const getDataSuccess = todo => ({
    type: ADD_TODO_SUCCESS,
    payload: {
        ...todo
    }
});

const getDataStarted = () => ({
    type: ADD_TODO_STARTED
});

const getDataFailure = error => ({
    type: ADD_TODO_FAILURE,
    payload: {
        error
    }
});