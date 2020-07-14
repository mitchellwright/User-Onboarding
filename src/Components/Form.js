import React, { useState } from 'react';
import * as yup from 'yup';

const Form = props => {
    const defaultValue = {
        name: "",
        email: "",
        password: "",
        terms: false
    };
    const [formState, setFormState] = useState({...defaultValue});

    let formSchema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email(),
        password: yup.string().required(),
        terms: yup.boolean().required()
    });

    const handleChange = event => {
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        setFormState({...formState, [event.target.name]: value});
    };

    return (
        <form>
            <div>
                <label htmlFor="">
                    Name
                </label>
                <input
                    name="name"
                    type="text"
                    id="name"
                    placeholder="Name"
                    onChange={handleChange}
                    value={formState.name}
                />
            </div>
            <div>
                <label htmlFor="email">
                    Email
                </label>
                <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={formState.email}
                />
            </div>
            <div>
                <label htmlFor="password">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={formState.password}
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
            </div>
            <div>
                <button type="submit">
                    Create Account
                </button>
            </div>
        </form>
    );
}

export default Form;