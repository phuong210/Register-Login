import ApiHepler from '../../services/services.js'
import './register.scss'
import React, { useEffect, useState } from 'react';
import InputComponent from '../../components/Input/Input.js';
import ButtonComponent from "../../components/Button/Button.js"
import Form from 'react-bootstrap/Form';
import { validate } from '../../components/validate.js';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from '../../components/toast.js';


const Register = () => {

    const [formValues, setFormValues] = useState({ name: "", email: "", password: "", confirm_password: "" });
    const [formErrors, setFormErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleChange = (e) => {
        if (e.target.name === "IsAccepted") {
            setFormValues({ ...formValues, [e.target.name]: e.target.checked });
        } else {
            setFormValues({ ...formValues, [e.target.name]: e.target.value });
        }
    };

    const focusHandler = (event) => {
        setTouched({ ...touched, [event.target.name]: true });
    };

    useEffect(() => {
        setFormErrors(validate(formValues));
    }, [formValues, touched]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(formErrors).length) {
            const object = {
                name: formValues.name,
                email: formValues.email,
                password: formValues.password,
                confirm_password: formValues.confirm_password
            }
            console.log(object);
            registerSubmit(object);
        }
    };

    const registerSubmit = async (object) => {
        try {
            document
                .querySelector(".btn-submit")
                .setAttribute("disabled", true);
            document.querySelector(
                ".btn-submit"
            ).innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="visually-hidden">Sign Up..</span>`;

            ApiHepler.setJwtToken(null);
            const response = await ApiHepler.post({ path: 'auth/register', payload: JSON.stringify(object) })
            console.log(response);

            console.log(response);
            if (response.success === true) {
                document
                    .querySelector(".btn-submit")
                    .removeAttribute("disabled");
                document.querySelector(".btn-submit").innerHTML =
                    "Sign Up";
                notify("Sign Up Success", "success");


            }
        } catch (error) {
            notify("Account is registered", "warning");
            document
                .querySelector(".btn-submit")
                .removeAttribute("disabled");
            document.querySelector(".btn-submit").innerHTML =
                "Sign Up";
        }
    };

    return (
        <div className="register d-flex align-items-center justify-content-center">
            <div className='container'>
                <Form onSubmit={handleSubmit}>
                    <h1 className='mb-4'>Register</h1>

                    <InputComponent
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Username"
                        value={formValues.name}
                        onChange={handleChange}
                        onFocus={focusHandler}
                    ></InputComponent>
                    {formErrors.name && touched.name && <span className="text-danger">{formErrors.name}</span>}

                    <InputComponent
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={formValues.email}
                        onChange={handleChange}
                        onFocus={focusHandler}
                    ></InputComponent>
                    {formErrors.email && touched.email && <span className="text-danger">{formErrors.email}</span>}

                    <InputComponent
                        showHiddenPass={true}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={formValues.password}
                        onChange={handleChange}
                        onFocus={focusHandler}
                    ></InputComponent>
                    {formErrors.password && touched.password && <span className="text-danger">{formErrors.password}</span>}

                    <InputComponent
                        showHiddenPass={true}
                        type="password"
                        id="confirm_password"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        value={formValues.confirm_password}
                        onChange={handleChange}
                        onFocus={focusHandler}

                    ></InputComponent>
                    {formErrors.confirm_password && touched.confirm_password && <span className="text-danger">{formErrors.confirm_password}</span>}

                    <ButtonComponent className={"mt-5 form-input btn-primary btn-submit"} name={"Sign Up"} type={"submit"} />

                </Form>
                <ToastContainer />
            </div>
        </div >)
}
export default Register;

