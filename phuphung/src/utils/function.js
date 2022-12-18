import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const parseObjectToFormData = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
    });
    return formData;
};
export const objectToQueryString = (obj, prefix) => {
    return Object.keys(obj)
        .map((objKey) => {
            if (obj.hasOwnProperty(objKey)) {
                const key = prefix ? `${prefix}[${objKey}]` : objKey;
                const value = obj[objKey];

                return typeof value === "object"
                    ? this.objectToQueryString(value, key)
                    : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
            }
            return null;
        })
        .join("&");
};
export const handleErrors = (response) => {
    if ([200, 201].includes(response.status)) {
        return response;
    }
    if (response.status === 401) {
        // location.href = '/login'
    }

    throw response;
};
// export const useLoading = (status) => {
//     const loading = status;
//     async function withLoading(callback) {
//         loading = true;
//         try {
//             const response = await callback();
//             loading = false;
//             return response;
//         } catch (error) {
//             loading = false;
//             throw error;
//         }
//     }
//     return [loading, withLoading];
// };
// export default useLoading;

export const validate = (values) => {
    const errors = {};
    // name

    if (!values.name) {
        errors.name = "Required";
    } else if (!/^([^0-9]*)$/.test(values.name)) {
        errors.name = "Number is not allowed";
    } else if (values.name.length < 5) {
        errors.name = "Must be 15 characters or less";
    }
    //password
    if (!values.password) {
        errors.password = " Required";
    } else if (values.password.length < 8) {
        errors.password = "password must have min 8 characters";
    } else if (values.password.length > 16) {
        errors.password = " password only have maximum 16 characters";
    } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(
            values.password
        )
    ) {
        errors.password =
            "Must Contain 1 Uppercase, 1 Number and 1 Special Case Character";
    }
    // confirm_password
    if (!values.confirm_password) {
        errors.confirm_password = "Required";
    } else if (values.confirm_password !== values.password) {
        errors.confirm_password = " password does not match ";
    }
    // email
    if (!values.email) {
        errors.email = "Required";
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = "Invalid email address";
    }
    return errors;
};

export const validateLogin = (values) => {
    const errors = {};
    // email
    if (!values.email) {
        errors.email = "Required";
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = "Invalid email address";
    }

    //password
    if (!values.password) {
        errors.password = " Required";
    } else if (values.password.length < 8) {
        errors.password = "password must have min 8 characters";
    } else if (values.password.length > 16) {
        errors.password = " password only have maximum 16 characters";
    } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(
            values.password
        )
    ) {
        errors.password =
            "Must Contain 1 Uppercase, 1 Number and 1 Special Case Character";
    }

    return errors;
};

export const showToastMessage = (type, e) => {
    if (type === "success") {
        toast.success(`${e}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });
    } else {
        toast.error(`${e}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });
    }
};
