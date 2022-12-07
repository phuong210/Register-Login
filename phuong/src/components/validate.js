export const validate = (data) => {
    const errors = {};

    if (!data.name.trim()) {
        errors.name = "Username cannot be blank";
    } else if (!/^([^0-9]*)$/.test(data.name)) {
        errors.name = "Field must not contain numbers"
    } else {
        delete errors.name;
    }

    if (!data.email) {
        errors.email = "Email cannot be blank";
    } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(data.email).toLowerCase())) {
        errors.email = "Email address is invalid!";
    } else {
        delete errors.email;
    }

    if (!data.password) {
        errors.password = "Password cannot be blank";
    } else if (!/[A-Z]/.test(data.password)) {
        errors.password = "Password should contains uppercase character";
    } else if (!/[$@%^&*()}{[\]}!]/.test(data.password)) {
        errors.password = "Password must contains at least 1 special character"
    } else if (!/[0-9]/.test(data.password)) {
        errors.password = "Password must contains at least 1 number character";
    } else if (!(data.password.length >= 6)) {
        errors.password = "Password needs to be 6 character or more";
    } else {
        delete errors.password;
    }

    if (!data.confirm_password) {
        errors.confirm_password = "Confirm password cannot be blank";
    } else if (!(data.confirm_password === data.password)) {
        errors.confirm_password = "Password is not match!";
    } else {
        delete errors.confirm_password;
    }

    if (data.IsAccepted) {
        delete errors.IsAccepted;
    } else {
        errors.IsAccepted = "Accept terms!";
    }

    return errors;
};