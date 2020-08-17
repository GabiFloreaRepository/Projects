import React from 'react';
import validate from "./validators/caregiver-validators";
import TextInput from "./fields/TextInput";
import './fields/fields.css';
import Button from "react-bootstrap/Button";
import * as API_CAREGIVERS from "./api/caregiver-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";


class CaregiverFormDelete extends React.Component{


    constructor(props){
        super(props);
        this.toggleForm = this.toggleForm.bind(this);

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls : {
                username: {
                    value: '',
                    placeholder: 'Username',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                }
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }

    componentDidMount() {

    }


    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = {
            ...this.state.formControls
        };

        const updatedFormElement = {
            ...updatedControls[name]
        };

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

        console.log("Element: " +  name + " validated: " + updatedFormElement.valid);

        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });
    };

    deleteCaregiver(caregiver){
        console.log(caregiver);
        return API_CAREGIVERS.deleteCaregiver(caregiver, (result, status, error) => {
            console.log(result);

            if(result !== null && (status === 200 || status ===201)){
                console.log("Successfully deleted caregiver); //: " + result);
                this.props.refresh();
            } else {
                this.setState({errorStatus: status});
                this.error = error;
            }
        });
    }



    handleSubmit(){
        this.deleteCaregiver(this.state.formControls.username.value);
    }

    render() {
        return (

            <form onSubmit={this.handleSubmit}>

                <h1>Delete caregiver</h1>

                <p> Username: </p>

                <TextInput name="username"
                           placeholder={this.state.formControls.username.placeholder}
                           value={this.state.formControls.username.value}
                           onChange={this.handleChange}
                           touched={this.state.formControls.username.touched}
                           valid={this.state.formControls.username.valid}
                />
                {this.state.formControls.username.touched && !this.state.formControls.username.valid &&
                <div className={"error-message row"}> * Username must have at least 3 characters </div>}

                <p>

                </p>
                <Button variant="success"
                        type={"submit"}
                        disabled={!this.state.formIsValid}>
                    Submit
                </Button>

                {this.state.errorStatus > 0 &&
                <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>}

            </form>

        );
    }
}

export default CaregiverFormDelete;