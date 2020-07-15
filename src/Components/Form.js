import React, { useState, useEffect } from 'react';
import Input from './Input';
import * as yup from 'yup';
import axios from 'axios';

const Form = props => {
    const defaultState = {
        name: "",
        email: "",
        password: "",
        terms: false
    };
    const [formState, setFormState] = useState({...defaultState});
    const [errors, setErrors] = useState({...defaultState, terms: ''});
    const [buttonDisabled, setButtonDisabled] = useState(true);


    let formSchema = yup.object().shape({
        name: yup.string().required("Please provide your name"),
        email: yup
            .string()
            .email("Please provide a valid email")
            .required("Please provide your email"),
        password: yup.string().required("Please provide a password"),
        terms: yup
            .boolean()
            .oneOf([true], "Please accept the terms and conditions")
    });

    useEffect(() => {
        formSchema.isValid(formState)
        .then(valid => setButtonDisabled(!valid));
    }, [formState]);

    const validateChange = event => {
        event.persist();

        if (event.target.value.length === 0) {
            setErrors({
                ...errors,
                [event.target.name]: `${event.target.name} field is required`
            });
        }
    };

    const handleChange = event => {
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;

        setFormState({...formState, [event.target.name]: value});
        validateChange(event);
    };

    const formSubmit = e => {
        e.preventDefault();
        console.log("form submitted");
        axios
        .post("https://reqres.in/api/users", formState)
        .then(res => {
            props.setUsers([
                ...props.users,
                {email: res.data.email,
                id: res.data.id,
                name: res.data.name,
                password: res.data.password,
                createdDate: res.data.createdAt
                }])
        })
        .catch(err => console.log(err));

        setFormState(defaultState);
    };

    return (
        <form onSubmit={formSubmit}>
            <div>
                <Input
                    handleChange={handleChange}
                    value={formState.name}
                    label="name"
                    type="text"
                    placeholder="Name"
                    name="name"
                    errors={errors}
                />

            </div>
            <div>
                <Input
                    handleChange={handleChange}
                    value={formState.email}
                    label="email"
                    type="text"
                    placeholder="Email"
                    name="email"
                    errors={errors}
                />
            </div>
            <div>
                <Input
                    handleChange={handleChange}
                    value={formState.password}
                    label="password"
                    type="password"
                    placeholder="Password"
                    name="password"
                    errors={errors}
                />
            </div>
            <div>
                <label htmlFor="terms">I accept the terms of service</label>
                <input
                    type="checkbox"
                    name="terms"
                    id="terms"
                    onChange={handleChange}
                />
                {errors.terms.length !== 0 && <p>{errors.terms}</p>}
            </div>
            <div>
                <button
                    type="submit"
                    disabled={buttonDisabled}
                >
                    Create Account
                </button>
            </div>
        </form>
    );
}

export default Form;