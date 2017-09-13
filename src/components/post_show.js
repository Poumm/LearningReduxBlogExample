import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPost, deletePost } from '../actions';


class PostShow extends Component {

    componentDidMount(){
        //params contient toutes les wildcard de notre url
        //tout ce que contient match est fourni pas redux-router
        const {id} = this.props.match.params;
        this.props.fetchPost(id);
    }

    onDeleteClick(){
        const {id} = this.props.match.params;
        this.props.deletePost(id, ()=>{
            this.props.history.push('/')
        });

    }

    render(){

        const {post} = this.props;
        //console.log(post);
        if(!post){
            return <div>Loading...</div>;
        }

        return (
            <div>
                <h3>{post.title}</h3>
                <h6>Categories : {post.categories}</h6>
                <p>{post.content}</p>
                <div className="text-xs-right">
                    <Link to="/" className="btn btn-primary">Back</Link>
                    <button 
                        className="btn btn-danger pull-xs-right"
                        onClick={this.onDeleteClick.bind(this)}>
                        Delete post
                    </button>
                </div>
            </div>
        );
    }
}

function mapStateToProps( {posts}, ownProps) {
    //console.log(posts);
    if(!posts){
        return {state : null};
    } 
    //console.log(posts[ownProps.match.params.id]);
    return { post : posts[ownProps.match.params.id] }
}

export default connect(mapStateToProps,  {fetchPost,deletePost})(PostShow);