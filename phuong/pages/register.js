
import ApiHepler from "../services/services.js";
// import { parseObjectToFormData } from '../utils/function.js';

let name = document.querySelector('#username');
let email = document.querySelector('#email');
let password = document.querySelector('#password');
let confirm_password = document.querySelector('#confirm-password');
let form = document.querySelector('form');
let button = document.querySelector('.btn-submit');



function showError(input, message) {
    let parent = input.parentElement;
    let small = parent.querySelector('small');

    parent.classList.add('error');
    small.innerText = message;

}
function showSuccess(input) {
    let parent = input.parentElement;
    let small = parent.querySelector('small');

    parent.classList.remove('error');
    small.innerText = '';

}

// check name
function checkName(input) {
    let name = input.value.trim();
    let regexName = /^([^0-9]*)$/;

    if (!name) {
        showError(input, 'Field cannot be blank');
        return false;
    }
    else if (!regexName.test(name)) {
        showError(input, 'Field must not contain numbers');
        return false;
    }
    else {
        showSuccess(input);
        return true;
    }
}

// check email 
function validateEmail(email) {
    const regexEmail =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regexEmail.test(String(email).toLowerCase());

}
function checkEmailError(input) {
    let emailValue = input.value.trim();
    if (!emailValue) {
        showError(input, 'Field cannot be blank');
        return false;
    } else if (!validateEmail(emailValue)) {
        showError(input, 'Email cannot be valid');
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

// check password: empty, length
function checkPasswordError(input, min, max) {
    input.value = input.value.trim();

    if (!input.value) {
        showError(input, 'Field cannot be blank');
        return false;
    } else if (input.value.length < min) {
        showError(input, `Field with at least ${min} characters`);
        return false;
    } else if (!/[$@%^&*()}{[\]}!]/.test(input.value)) {
        showError(input, 'Password must contains at least 1 special character');
        return false;
    } else if (!/[0-9]/.test(input.value)) {
        showError(input, 'Password must contains at least 1 number character');
        return false;
    } else if (!/[A-Z]/.test(input.value)) {
        showError(input, 'Password should contains uppercase character');
        return false;
    } else if (input.value.length > max) {
        showError(input, `Field exceed ${max} characters`);
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

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

// check match password
function checkMatchPasswordError(passwordInput, cfPasswordInput) {
    if (passwordInput.value.trim() !== cfPasswordInput.value.trim()) {
        showError(cfPasswordInput, 'Passwords does not match');
        return false;
    } else {
        showSuccess(cfPasswordInput);
        return true;
    }
}


form.addEventListener('submit', function (e) {
    e.preventDefault();
    // let isEmptyError = checkEmptyError([name, email, password])
    let isName = checkName(name);
    let isEmailError = checkEmailError(email);
    let isPassword = checkPasswordError(password, 8, 16);
    let isMatchError = checkMatchPasswordError(password, confirm_password);

    if (isEmailError && isName && isPassword && isMatchError) {
        console.log(1);
        const object = {
            name: name.value,
            email: email.value,
            password: password.value,
            confirm_password: confirm_password.value
        };
        console.log(object);
        register(object);
    }
})

// button.addEventListener('click', function () {
//     const object = {
//         name: name.value,
//         email: email.value,
//         password: password.value,
//         confirm_password: confirm_password.value
//     };
//     // console.log(object);
//     register(object);
// })
const register = async (object) => {
    try {
        ApiHepler.setJwtToken(null);
        button.setAttribute('disabled', true)
        button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="visually-hidden">Sign Up...</span>`;
        const response = await ApiHepler.post({ path: 'auth/register', payload: JSON.stringify(object) })

        // console.log(resposne);
        if (response.success === true) {
            button.removeAttribute('disabled');
            button.innerHTML = 'Sign Up';
            // console.log(response);

            $(myModalSuccess).modal('show');
            $('#btnSignIn').click(function () {
                window.location.href = '../public/login.html';
            })
            // ApiHepler.storeAccessToken(resposne.data.access_token);

            resetForm({ name, email, password, confirm_password })
            // modal thanh cong
            // window.location.href = '../public/login.html';
        }
    } catch (e) {
        console.log(e);
        button.removeAttribute('disabled');
        button.innerHTML = 'Register';
        $('#myModalFail').find('.modal-body').html(e.data.email[0]);
        $(myModalFail).modal('show');


        // modal error
    }
}
const resetForm = (data) => {
    data.name.value = '';
    data.email.value = '';
    data.password.value = '';
    data.confirm_password.value = ''
}

