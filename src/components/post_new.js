import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createPost } from '../actions';


class PostNew extends Component {

    renderField(field){
        
        const {meta : {touched, error} } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}` ;
        
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    type="text"
                    className='form-control'
                    //map toutes les propriété de field.input à toutes les propriété de l'input 
                    {...field.input}
                />
                <div className="text-help">
                    {// récupère l'erreur depuis la méthode validate en focntion du name du composant
                        touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values){
        // console.log(values);
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {

        const { handleSubmit } = this.props;



        return (
            <form onSubmit={handleSubmit( this.onSubmit.bind(this) )}>
                <Field 
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field 
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link className="btn btn-danger" to="/">
                       Cancel
                </Link>
            </form>
        );
    }
}

function validate(values) {
    //console.log(values);
       
    // gestion des erreurs
    // Si errors est vide c'est qu'il n'y a pas d'erreur, donc on peut submit le form
    const errors = {};

    // validate the inputs from 'values'
    if(!values.title || values.title.length < 3){
        // errors.???? doit être identique au name du composant auquel l'erreur se raporte.
        // de cette manière le composant en erreur est automatiquement récupéré
        errors.title = "Enter a title that is at least 3 characters!";
    }
    if(!values.categories){
        errors.categories = "Enter some categories";
    }
    if(!values.content){
        errors.content = "Enter some content";
    }

    return errors;
}

/*
version avec uniquement le reduxform sans la connection
export default reduxForm({
    //validate: validate
    validate,
    //donne un id unique au form au cas où on voudrait en afficher plusieur
    form : 'PostNewForm'
})(PostNew);*/

export default reduxForm({
    validate,
    form : 'PostNewForm'
})(
    connect(null,{ createPost })(PostNew)
);