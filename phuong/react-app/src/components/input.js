import Form from 'react-bootstrap/Form';
// import { IconName } from "react-icons/bs";
// import "bootstrap-icons/font/bootstrap-icons.css";

const InputComponent = ({ className, name, id, placeholder, type, showHidePassword, validate }) => {
    const renderInput = () => {
        if (showHidePassword) {
            return (
                <Form.Group className={`mb-5 ${className}`}>
                    <Form.Control type={type} id={id} placeholder={placeholder} name={name} />
                    {/* <div className='showHidenPass'><BsFillEyeFill /></div> */}
                    <Form.Control.Feedback type="invalid">Field cannot be blank</Form.Control.Feedback>
                </Form.Group>
            )
        } else {
            return (
                <Form.Group className={`mb-5 ${className}`} controlId={validate}>
                    <Form.Control type={type} id={id} placeholder={placeholder} name={name} />
                    <Form.Control.Feedback type="invalid">Field cannot be blank</Form.Control.Feedback>
                </Form.Group>
            )
        }
    }
    return (
        <>
            {renderInput()}
        </>
    )
}
export default InputComponent;