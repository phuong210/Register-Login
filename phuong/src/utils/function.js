export const parseObjectToFormData = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
    });
    return formData;
};
export const objectToQueryString = (obj, prefix) => {
    return Object.keys(obj).map(objKey => {
        if (obj.hasOwnProperty(objKey)) {
            const key = prefix ? `${prefix}[${objKey}]` : objKey;
            const value = obj[objKey];

            return typeof value === "object" ?
                this.objectToQueryString(value, key) :
                `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }
        return null;
    }).join("&");
}
export const handleErrors = (response) => {
    if ([200, 201].includes(response.status)) {
        return response
    }

    throw response
}

export const validate = ({ name, email, password, confirm_password }) => {
    const errors = {};

    if (!name.trim()) {
        errors.name = "Username cannot be blank";
    } else if (!/^([^0-9]*)$/.test(name)) {
        errors.name = "Field must not contain numbers"
    } else {
        delete errors.name;
    }

    if (!email) {
        errors.email = "Email cannot be blank";
    } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase())) {
        errors.email = "Email address is invalid!";
    } else {
        delete errors.email;
    }

    if (!password) {
        errors.password = "Password cannot be blank";
    } else if (!/[A-Z]/.test(password)) {
        errors.password = "Password should contains uppercase character";
    } else if (!/[$@%^&*()}{[\]}!]/.test(password)) {
        errors.password = "Password must contains at least 1 special character"
    } else if (!/[0-9]/.test(password)) {
        errors.password = "Password must contains at least 1 number character";
    } else if (!(password.length >= 6)) {
        errors.password = "Password needs to be 6 character or more";
    } else {
        delete errors.password;
    }

    if (!confirm_password) {
        errors.confirm_password = "Confirm password cannot be blank";
    } else if (!(confirm_password === password)) {
        errors.confirm_password = "Password is not match!";
    } else {
        delete errors.confirm_password;
    }

    return errors;
};