// import ApiHelper from '../../services/services.js'
// console.log(ApiHelper);

import ApiHepler from "../services/services.js";

let form = document.getElementById('form');
let name = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');
let confirm_password = document.getElementById('password2');
let button = document.querySelector('.btn-register');

form.addEventListener('submit', e => {
    e.preventDefault();

    checkInputs();
});

function checkInputs() {
    // trim to remove the whitespaces
    const usernameValue = name.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = confirm_password.value.trim();

    if (usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank');
    } else {
        setSuccessFor(username);
    }

    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
    } else {
        setSuccessFor(email);
    }

    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
    } else {
        setSuccessFor(password);
    }

    if (password2Value === '') {
        setErrorFor(confirm_password, 'Password2 cannot be blank');
    } else if (passwordValue !== password2Value) {
        setErrorFor(confirm_password, 'Passwords does not match');
    } else {
        setSuccessFor(confirm_password);
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}


button.addEventListener('click', function () {
    const object = {
        name: name.value,
        email: email.value,
        password: password.value,
        confirm_password: confirm_password.value
    };
    console.log(object);
    register(object);
})
const register = async (object) => {
    try {
        ApiHepler.setJwtToken(null);
        button.setAttribute('disabled', true)
        button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="visually-hidden">Register...</span>`;
        const response = await ApiHepler.post({ path: 'auth/register', payload: JSON.stringify(object) })

        // console.log(resposne);
        if (resposne.success === true) {
            button.removeAttribute('disabled');
            button.innerHTML = 'register';
            console.log(resposne);
            // ApiHepler.storeAccessToken(resposne.data.access_token);

            resetForm({ name, email, password, confirm_password })
            // modal thanh cong
            window.location.href = '../public/login.html';
        }
    } catch (e) {
        console.log(e);
        // modal error
    }
}
const resetForm = (data) => {
    data.name.value = '';
    data.email.value = '';
    data.password.value = '';
    data.confirm_password.value = ''
}
