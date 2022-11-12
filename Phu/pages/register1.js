import ApiHepler from "../services/services.js";


let name = document.querySelector('.name');
let email = document.querySelector('.email');
let password = document.querySelector('.password');
let confirm_password = document.querySelector('.confirm__password')
let button = document.querySelector('.register-submit');
let form = document.querySelector('form');
let modal_success = document.querySelector('#modalSuccess');
let modal_fail = document.querySelector('#modalFail');


// show hidden eye password
const showHiddenPassword = () => {
    let togglePassword = document.querySelector("#togglePassword");
    let toggleCfPassword = document.querySelector('#toggleCfPassword');

    togglePassword.addEventListener("click", function () {
        // toggle the type attribute
        const type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);

        // toggle the icon
        this.classList.toggle("bi-eye");
    });
    toggleCfPassword.addEventListener("click", function () {
        const type = confirm_password.getAttribute("type") === "password" ? "text" : "password";
        confirm_password.setAttribute("type", type);
        this.classList.toggle("bi-eye");
    })
}
showHiddenPassword();



// VALIDATE



export const showError = (input, message) => {
    let parent = input.parentElement;
    let small = parent.querySelector('small');

    parent.classList.add('error');
    small.innerText = message;

}

export const showSuccess = (input) => {
    let parent = input.parentElement;
    let small = parent.querySelector('small');

    parent.classList.remove('error');
    small.innerText = '';

}

//  check name
export const validateName = (input) => {
    const nameValue = input.value.trim();
    const regexName = /^([^0-9]*)$/;

    if (!nameValue) {
        showError(input, 'Field is not blank')
        return false;
    } else if (!regexName.test(nameValue)) {
        showError(input, "Number is not allowed")
        return false;

    } else {
        showSuccess(input);
        return true;
    }

}

const isValidEmail = (email) => {
    const regexEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexEmail.test(String(email).toLowerCase());

};

// check email 
export const validateEmail = (input) => {
    const emailValue = input.value.trim();

    if (!emailValue) {
        showError(input, "Field is not blank");
        return false;
    } else if (!isValidEmail(emailValue)) {
        showError(input, "Email is not valid ")
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}


// check password

export const validatePassword = (input) => {
    const passwordValue = input.value.trim();

    if (!passwordValue) {
        showError(input, "Field is not blank");
        return false;
    } else if (passwordValue.length < 8 && passwordValue.length > 16) {
        showError(input, "password must have min 8 characters and maximum 16 characters")
        return false;
    } else if (
        !/[$@%^&*()}{[\]}!]/.test(passwordValue)) {
        showError(input, "Password should contains at least 1 special character");
        return false;

    } else if (
        !/[0-9]/.test(passwordValue)) {
        showError(input, "Password should contains at least 1 number character");
        return false;
    } else if (
        !/[A-Z]/.test(passwordValue)) {
        showError(input, "Password should contains at least 1 uppercase character ");
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}





// check match password
function checkMatchPasswordError(passwordInput, cfPasswordInput) {

    if (!cfPasswordInput.value.trim()) {
        showError(cfPasswordInput, 'Field is not blank');

    } else if (passwordInput.value.trim() !== cfPasswordInput.value.trim()) {
        showError(cfPasswordInput, 'Password does not match');
        return false;
    } else {
        showSuccess(cfPasswordInput);
        return true;
    }

}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let isMatchError = checkMatchPasswordError(password, confirm_password);
    let checkName = validateName(name);
    let checkEmail = validateEmail(email);
    let checkPassword = validatePassword(password);



    if (checkName && checkEmail && checkPassword && isMatchError) {
        console.log(1);
        const object = {
            name: name.value,
            email: email.value,
            password: password.value,
            confirm_password: confirm_password.value

        };
        console.log(object);
        register(object);
    } else {
        // // logic, call api
        // // bắt sự kiện click , lấy thông tin từ các field
        // button.addEventListener('click', function () {

        // })





    }






})

const register = async (object) => {
    try {
        ApiHepler.setJwtToken(null);
        button.setAttribute('disabled', true);
        button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="visually-hidden">Sign Up..</span>`;
        const response = await ApiHepler.post({
            path: 'auth/register',
            payload: JSON.stringify(object)
        })
        console.log(response);
        if (response.success === true) {

            button.removeAttribute('disabled')
            button.innerHTML = 'Sign Up';
            $(modal_success).modal('show');
            $('#btnRedirect').click(function () {
                //handle redirect link
                window.location.href = '../public/login1.html';

            })
            // setTimeout(() => {
            //     window.location.href = '../public/login1.html';
            // }, 3000);



            resetForm({
                email,
                password,
                name,
                confirm_password
            });

        }

    } catch (e) {
        button.removeAttribute('disabled')
        button.innerHTML = 'Sign Up';
        console.log(e);
        $('#modalFail').find('.modal-body').html(e.data.email[0]);
        $(modal_fail).modal('show');


    }
}


// xóa đi thông tin dăng nhập
const resetForm = (data) => {
    data.email.value = '';
    data.password.value = '';
    data.name.value = '';
    data.confirm_password.value = '';

}