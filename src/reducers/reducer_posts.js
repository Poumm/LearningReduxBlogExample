import _ from 'lodash';

import {FETCH_POSTS, FETCH_POST, CREATE_POST, DELETE_POST} from '../actions';


export default function(state=null, action){

    switch(action.type){
        case FETCH_POSTS:
            return(_.mapKeys(action.payload.data,'id'));
        
        case FETCH_POST:
            /*const post = action.payload.data;
            const newState = {...state};
            newState[post.id] = post;
            return newState;*/
            return {... state, [action.payload.data.id]:action.payload.data }
        
        //On retire coté client le post qui a été suprimé afin qu'il n'apparraissent pas sur la page en attendant le rechargement.
        case DELETE_POST:
            return _.omit(state, action.payload);

        default:
            return state;
    }
} 
