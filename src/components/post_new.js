import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';

class PostNew extends Component {

    renderField(field){
        return (
            <div className='form-group'>
                <label>{field.label}</label>
                <input
                    type="text"
                    className='form-control'
                    //map toutes les propriété de field.input à toutes les propriété de l'input
                    {...field.input}
                />
            </div>
        );
    }

    render() {
        return (
            <form>
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
    if(!values.title || values.title.lenght<3){
        errors.title = "Enter a title that is at least 3 characters!";
    }
    if(!values.categoris){
        errors.title = "Enter some categories";
    }
    if(!values.content){
        errors.title = "Enter some content";
    }

    return errors;
}

export default reduxForm({
    //validate: validate
    validate,
    //donne un id unique au form au cas où on voudrait en afficher plusieur
    form : 'PostNewForm'
})(PostNew);