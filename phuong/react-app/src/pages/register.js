import ApiHepler from '../services/services.js'
import '../assets/css/register.scss';
import { useFormik } from 'formik';
import * as Yup from "yup";
import Form from 'react-bootstrap/Form';
import ButtonComponent from "../components/Button";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirm_password: ""
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Please Enter a username")
                .min(4, "Must be 4 characters or more"),
            email: Yup.string()
                .required("Please Enter your Email")
                .matches(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "Please enter a valid email"),
            password: Yup.string()
                .required('Please Enter your password')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                ),
            confirm_password: Yup.string()
                .required("Required")
                .oneOf([Yup.ref("password"), null], "Password must match "),
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            registerSubmit(values);
            resetForm({ values: '' });
        }

    });

    const registerSubmit = async (object) => {
        try {
            ApiHepler.setJwtToken(null);
            const response = await ApiHepler.post({ path: 'auth/register', payload: JSON.stringify(object) })
            console.log(response);
            if (response.success === true) {
                toast('success');

            }
        } catch (error) {
            console.log(error);
            toast('Fail');
        }
    }
    return (
        <div className="register d-flex align-items-center justify-content-center">
            <div className='container'>
                <Form onSubmit={formik.handleSubmit} >
                    <h1 className='mb-4'>Register</h1>

                    <Form.Group className='mb-5 form-input'>
                        <Form.Control
                            required
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Username"
                            value={formik.values.name}
                            onChange={formik.handleChange}

                        />
                        {formik.errors.name && (
                            <p className='text-danger errorMsg'>{formik.errors.name}</p>
                        )}
                    </Form.Group>

                    <Form.Group className='mb-5 form-input'>
                        <Form.Control
                            required
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.email && (
                            <p className='text-danger errorMsg'>{formik.errors.email}</p>
                        )}
                    </Form.Group>

                    <Form.Group className='mb-5 form-input'>
                        <Form.Control
                            required
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.password && (
                            <p className='text-danger errorMsg'>{formik.errors.password}</p>
                        )}
                    </Form.Group>

                    <Form.Group className='mb-5 form-input'>
                        <Form.Control
                            required
                            type="password"
                            id="confirm_password"
                            name="confirm_password"
                            placeholder="Confirm Password"
                            value={formik.values.confirm_password}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.confirm_password && (
                            <p className='text-danger errorMsg'>{formik.errors.confirm_password}</p>
                        )}
                    </Form.Group>

                    <ButtonComponent className={"form-input btn-primary btn-submit"} name={"Sign Up"} type={"submit"} />
                    <ToastContainer />
                </Form>
            </div>
        </div >)
}
export default Register;

