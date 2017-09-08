import _ from 'lodash';

import {FETCH_POSTS} from '../actions';

export default function(state=null, action){

    switch(action.type){
        case FETCH_POSTS:
        //console.log('action recue', action.payload.data);
        return(_.mapKeys(action.payload.data,'id'));

        default:
            return state;
    }
} 
