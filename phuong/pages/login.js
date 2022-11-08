import ApiHepler from "../services/services.js";
import { parseObjectToFormData } from '../utils/function.js'



let email = document.querySelector('#email');
let password = document.querySelector('#password');
let formLogin = document.querySelector('form');
let buttonLogin = document.querySelector('.btn-login');



function checkInputs() {
    let emailValue = email.value.trim();
    let passwordValue = password.value.trim();

    if (emailValue === '') {
        showError(email, 'Email cannot be blank')
    }
    else if (!(isEmail(emailValue))) {
        showError(email, 'Not a valid email');
    }
    else {
        showSuccess(email);
    }

    if (passwordValue === '') {
        showError(password, 'Password cannot be blank');
    }
    else {
        showSuccess(password);
    }
}

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
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

// show hidden eye password
const showHiddenPassword = () => {
    let togglePassword = document.querySelector("#togglePassword");

    togglePassword.addEventListener("click", function () {
        // toggle the type attribute
        const type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);

        // toggle the icon
        this.classList.toggle("bi-eye");
    });

}
showHiddenPassword();

formLogin.addEventListener('submit', function (e) {
    e.preventDefault();

    checkInputs();
    if (checkInputs() === false) {
        checkInputs();
    }
    else {
        buttonLogin.addEventListener('click', function () {
            const object = {
                email: email.value,
                password: password.value,
            };
            login(object);
        })
        const login = async (values) => {
            try {
                buttonLogin.setAttribute('disabled', true)
                buttonLogin.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="visually-hidden">Login...</span>`;
                const resposne = await ApiHepler.post({ path: 'auth/login', payload: parseObjectToFormData(values) })
                if (resposne.success === true) {
                    buttonLogin.removeAttribute('disabled')
                    buttonLogin.innerHTML = 'Sign in';

                    $(myModalSuccess).modal('show');
                    // alert('Dang Nhap Thanh Cong')
                    ApiHepler.storeAccessToken(resposne.data.access_token);
                    resetForm({ email, password })
                    // window.location.href = '../public/index.html';
                }
            } catch (e) {
                console.log(e);
                $(myModalFail).modal('show');
            }
        }
        const resetForm = (data) => {
            data.email.value = '';
            data.password.value = ''
        }

    }
});
