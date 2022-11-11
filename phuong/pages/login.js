import ApiHepler from "../services/services.js";
import { parseObjectToFormData } from '../utils/function.js'



let email = document.querySelector('#email');
let password = document.querySelector('#password');
let formLogin = document.querySelector('form');
let buttonLogin = document.querySelector('.btn-login');


function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function checkEmail(input) {
    let emailValue = email.value.trim();

    if (emailValue === '') {
        showError(email, 'Field cannot be blank');
        return false;
    }
    else if (!(isEmail(emailValue))) {
        showError(email, 'Not a valid email');
        return false;
    }
    else {
        showSuccess(email);
        return true;
    }

}

function checkPasswordError(input, min, max) {
    input.value = input.value.trim();

    if (!input.value) {
        showError(input, 'Field cannot be blank');
        return false;
    }
    else {
        showSuccess(input);
        return true;
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

    let isCheckEmail = checkEmail(email);
    let isCheckPass = checkPasswordError(password);
    if (isCheckEmail && isCheckPass) {
        console.log(1);
        const object = {
            email: email.value,
            password: password.value,
        };
        console.log(object);
        login(object);
    }
});

const login = async (values) => {
    try {
        buttonLogin.setAttribute('disabled', true)
        buttonLogin.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="visually-hidden">Login...</span>`;
        const resposne = await ApiHepler.post({ path: 'auth/login', payload: parseObjectToFormData(values) })
        // console.log(resposne)
        if (resposne.success === true) {
            ApiHepler.setJwtToken(null);
            buttonLogin.removeAttribute('disabled')
            buttonLogin.innerHTML = 'Sign in';

            // alert('Dang Nhap Thanh Cong')
            ApiHepler.storeAccessToken(resposne.data.access_token);

            $(myModalSuccess).modal('show');
            $('#btnNextPage').click(function () {
                window.location.href = '../public/index.html';
            })
            resetForm({ email, password })
            // window.location.href = '../public/index.html';
        }
    } catch (e) {
        buttonLogin.removeAttribute('disabled');
        buttonLogin.innerHTML = 'Sign In';
        $('#myModalFail').find('.modal-body').html(e.message);
        $(myModalFail).modal('show');
    }
}
const resetForm = (data) => {
    data.email.value = '';
    data.password.value = ''
}