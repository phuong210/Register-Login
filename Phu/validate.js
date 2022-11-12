// import ApiHelper from '../../services/services.js'
// console.log(ApiHelper);


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
// check rỗng
function checkEmptyError(listInput) {
    let isEmptyError = false;
    listInput.forEach(input => {
        input.value = input.value.trim();
        if (!input.value) {
            isEmptyError = true;
            showError(input, 'Field Not Empty');
        } else {
            showSuccess(input);
        }
    });

    return isEmptyError;
}

// check email 
function checkEmailError(input) {
    const regexEmail =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    input.value = input.value.trim();
    let isEmailError = !regexEmail.test(input.value);
    if (regexEmail.test(input.value)) {
        showSuccess(input);
    } else {
        showError(input, 'Email invalid')
    }
    return isEmailError;
}

// check length password
function checkLengthError(input, min, max) {
    input.value = input.value.trim();

    if (input.value.length < min) {
        showError(input, `Field with at least ${min} characters`);
        return true;
    }
    if (input.value.length > max) {
        showError(input, `Field exceed ${max} characters`);
        return true;
    }
    // showSuccess(input);
    return false;
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
    if (passwordInput.value !== cfPasswordInput.value) {
        showError(cfPasswordInput, 'Password does not match');
        return true;
    }
    return false;
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let isEmptyError = checkEmptyError([name, email, password, confirm_password])
    let isEmailError = checkEmailError(email);
    let isUsernameLengthError = checkLengthError(name, 3, 10);
    let isPasswordLengthError = checkLengthError(password, 8, 16);
    let isMatchError = checkMatchPasswordError(password, confirm_password);

    if (isEmptyError || isEmailError || isUsernameLengthError || isPasswordLengthError || isMatchError) {
        console.log(1);
    } else {
        // logic, call api
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
                const response = await ApiHepler.post({
                    path: 'auth/register',
                    payload: JSON.stringify(object)
                })

                // console.log(resposne);
                if (response.success === true) {
                    button.removeAttribute('disabled');
                    button.innerHTML = 'register';
                    // ApiHepler.storeAccessToken(resposne.data.access_token);

                    resetForm({
                        name,
                        email,
                        password,
                        confirm_password
                    })
                    // modal thanh cong
                    // window.location.href = '../public/index.html';
                }
            } catch (e) {
                console.log(e);
            }
        }
        const resetForm = (data) => {
            data.name.value = '';
            data.email.value = '';
            data.password.value = '';
            data.confirm_password.value = ''
        }

    }
})







// let name = document.querySelector('#username');
// let email = document.querySelector('#email')
// let password = document.querySelector('#password');
// let confirm_password = document.querySelector('#confirm-password');

// button.addEventListener('click', function () {
//     const object = {
//         name: name.value,
//         email: email.value,
//         password: password.value,
//         confirm_password: confirm_password.value
//     };
//     console.log(object);
//     register(object);
// })
// const register = async (object) => {
//     try {
//         ApiHepler.setJwtToken(null);
//         button.setAttribute('disabled', true)
//         button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="visually-hidden">Register...</span>`;
//         const response = await ApiHepler.post({ path: 'auth/register', payload: JSON.stringify(object) })

//         console.log(resposne);
//         if (resposne.success === true) {
//             button.removeAttribute('disabled');
//             button.innerHTML = 'register';
//             // ApiHepler.storeAccessToken(resposne.data.access_token);

//             resetForm({ name, email, password, confirm_password })
//             // window.location.href = '../public/index.html';
//         }
//     } catch (e) {
//         console.log(e);
//     }
// }
// const resetForm = (data) => {
//     data.name.value = '';
//     data.email.value = '';
//     data.password.value = '';
//     data.confirm_password.value = ''
// }