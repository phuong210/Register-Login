import "bootstrap/dist/css/bootstrap.min.css";
import ApiHepler from "../services/services.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import "../assets/css/register.css";
import { validate } from "../utils/function.js";
import { useState } from "react";
import LoadingSpinner from "../components/Spinner.js";
import ButtonComponent from "../components/Button.js";
import InputComponents from "../components/Input.js";
const Register = () => {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirm_password: "",
        },
        validate,
        onSubmit: (values, { resetForm }) => {
            registerCall(values);
            resetForm({ values: "" });
        },
    });

    const handleFocus = (ev) => {
        ev.target.classList.add("active");
    };
    const handleBlur = (ev) => {
        if (ev.target.value !== "") return;
        ev.target.classList.remove("active");
    };

    const notifySuccess = () => {
        toast.success("register successfuly !", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });
    };

    const notifyFail = () => {
        toast.error("register fail ! Please try again!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });
    };

    const registerCall = async (object) => {
        try {
            setLoading(true);
            ApiHepler.setJwtToken(null);
            const response = await ApiHepler.post({
                path: "auth/register",
                payload: JSON.stringify(object),
            });
            console.log(response);

            if (response.success === true) {
                setLoading(false);
                notifySuccess();
            }
        } catch (e) {
            console.log(e);
            setLoading(false);
            notifyFail();
        }
    };

    return (
        <div className='d-flex justify-content-center'>
            <div className='box '>
                <div className='inner-box'>
                    <div className='forms-wrap'>
                        <form
                            onSubmit={formik.handleSubmit}
                            className='sign-up-form'
                            disabled={loading}
                        >
                            <div className='logo'>
                                {/* <img src='../img/logo.png' alt='easyclass' /> */}
                                <h4>easyclass</h4>
                            </div>
                            <div className='heading'>
                                <h2>Get Started</h2>
                                <h6>Already have an account?</h6>
                                <a href='./login.html' className='toggle'>
                                    Sign in
                                </a>
                            </div>
                            <div className='actual-form'>
                                <InputComponents
                                    name='name'
                                    id='name'
                                    type='text'
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                >
                                    {formik.errors.name ? (
                                        <small className='text-danger'>
                                            {formik.errors.name}
                                        </small>
                                    ) : null}
                                </InputComponents>

                                <InputComponents
                                    name='email'
                                    id='email'
                                    type='text'
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                >
                                    {formik.errors.email ? (
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
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    ShowHidePassword='true'
                                    placeholder='password'
                                >
                                    {formik.errors.password ? (
                                        <small className='text-danger'>
                                            {formik.errors.password}
                                        </small>
                                    ) : null}
                                </InputComponents>

                                <InputComponents
                                    name='confirm_password'
                                    id='confirm_password'
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.confirm_password}
                                    ShowHidePassword='true'
                                    placeholder='confirm password'
                                >
                                    {formik.errors.confirm_password ? (
                                        <small className='text-danger'>
                                            {formik.errors.confirm_password}
                                        </small>
                                    ) : null}
                                </InputComponents>

                                <ButtonComponent
                                    type={"submit"}
                                    className={"sign-btn register-submit"}
                                    name={"Sign Up"}
                                >
                                    {loading ? <LoadingSpinner /> : ""}
                                </ButtonComponent>

                                <ToastContainer />
                                <p className='text'>
                                    By signing up, I agree to the
                                    {/* <a href=''>Terms of Services</a> and
                                    <a href=''>Privacy Policy</a> */}
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

export default Register;
