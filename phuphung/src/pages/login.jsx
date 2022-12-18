import "bootstrap/dist/css/bootstrap.min.css";
import { parseObjectToFormData } from "utils/function.js";
import ApiHepler from "services/services.js";
import { useFormik } from "formik";
import { useState } from "react";
import ButtonComponent from "components/Button.js";
import InputComponents from "components/Input.js";
import { showToastMessage } from "utils/function.js";
import { ETypeStatus } from "constants/constant.js";
import "assets/css/login.css";
import { Link } from "react-router-dom";
import { validateLogin } from "utils/function.js";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [nameLogin, setNameLogin] = useState("Log In");

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validate: validateLogin,
        onSubmit: (values) => {
            console.log(values);
            loginCall(values);
        },
    });
    const resetForms = () => {
        formik.values.email = "";
        formik.values.password = "";
    };

    const handleFocus = (ev) => {
        ev.target.classList.add("active");
    };
    const handleBlur = (ev) => {
        formik.handleBlur(ev);

        if (ev.target.value !== "") return;

        ev.target.classList.remove("active");
    };

    const loginCall = async (object) => {
        try {
            setLoading(true);
            setNameLogin("");
            const response = await ApiHepler.post({
                path: "auth/login",
                payload: parseObjectToFormData(object),
                // payload: JSON.stringify(object),
            });
            console.log(response);

            if (response.success === true) {
                ApiHepler.setJwtToken(null);
                setLoading(false);

                setNameLogin("Log In");

                ApiHepler.storeAccessToken(response.data.access_token);

                showToastMessage(ETypeStatus.SUCCESS, response.message);

                resetForms();
            }
        } catch (e) {
            console.log(e, "bao loi ");
            setLoading(false);
            setNameLogin("Log In");
            console.log("bao loi khi da chay xong spinner");
            showToastMessage(ETypeStatus.ERROR, e.message);
            console.log("bao loi khi da hien thong bao bao loi");
        }
    };
    return (
        <div className='d-flex justify-content-center'>
            <div className='box login'>
                <div className='inner-box'>
                    <div className='forms-wrap'>
                        <form
                            onSubmit={formik.handleSubmit}
                            className='sign-in-form'
                            disabled={loading}
                        >
                            <div className='logo'>
                                <img src='../img/logo.png' alt='easyclass' />
                                <h4>easyclass</h4>
                            </div>
                            <div className='heading'>
                                <h2>Welcome Back</h2>
                                <h6>Not registred yet?</h6>
                                {/* <a href='./register.html' className='toggle'>
                                    Sign up
                                </a> */}
                                <Link to='/register' className='toggle'>
                                    Sign Up
                                </Link>
                            </div>
                            <div className='actual-form'>
                                <InputComponents
                                    name='email'
                                    id='email'
                                    type='text'
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                >
                                    {formik.touched.email &&
                                    formik.errors.email ? (
                                        <small className='text-danger'>
                                            {formik.errors.email}
                                        </small>
                                    ) : null}
                                </InputComponents>

                                <InputComponents
                                    name='password'
                                    id='password'
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    // onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    ShowHidePassword='true'
                                    placeholder='password'
                                >
                                    {formik.touched.password &&
                                    formik.errors.password ? (
                                        <small className='text-danger'>
                                            {formik.errors.password}
                                        </small>
                                    ) : null}
                                </InputComponents>

                                <ButtonComponent
                                    type={"submit"}
                                    className={"sign-btn register-submit"}
                                    name={nameLogin}
                                    isLoading={loading}
                                >
                                    {/* {loading ? <LoadingSpinner /> : ""} */}
                                </ButtonComponent>
                                <p className='text'>
                                    Forgotten your password or you login
                                    datails?
                                    {/* <a href='#'>Get help</a> signing in */}
                                </p>
                            </div>
                        </form>
                    </div>
                    <div className='carousel'>
                        <div className='images-wrapper'>
                            <img
                                src='../img/image1.png'
                                className='image img-1 show'
                                alt=''
                            />
                            <img
                                src='../img/image2.png'
                                className='image img-2'
                                alt=''
                            />
                            <img
                                src='../img/image3.png'
                                className='image img-3'
                                alt=''
                            />
                        </div>
                        <div className='text-slider'>
                            <div className='text-wrap'>
                                <div className='text-group'>
                                    <h2>Create your own courses</h2>
                                    <h2>Customize as you like</h2>
                                    <h2>Invite students to your class</h2>
                                </div>
                            </div>
                            <div className='bullets'>
                                <span className='active' data-value={1} />
                                <span data-value={2} />
                                <span data-value={3} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
