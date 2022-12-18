import ApiHepler from "../services/services.js";
import {
    parseObjectToFormData
} from '../utils/function.js'



let email = document.querySelector('.email');
let password = document.querySelector('.password');

let button = document.querySelector('.sign-in-submit');
let form = document.querySelector('form');
let modal_success = document.querySelector('#modalSuccess');
let modal_fail = document.querySelector('#modalFail');


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



// VALIDATE



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











form.addEventListener('submit', function (e) {
    e.preventDefault();
    let checkEmail = validateEmail(email);
    let checkPassword = validatePassword(password);



    if (checkEmail && checkPassword) {
        console.log(1);
        const object = {

            email: email.value,
            password: password.value,


        };
        console.log(object);
        login(object);

    } else {
        // const formData = new FormData(form);
        // const data = Object.fromEntries(formData);
        // console.log(data)
        // logic, call api
        // bắt sự kiện click , lấy thông tin từ các field





    }
})

const login = async (object) => {
    try {


        button.setAttribute('disabled', true);
        button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="visually-hidden">Sign Up..</span>`;
        const response = await ApiHepler.post({
            path: 'auth/login',
            payload: parseObjectToFormData(object)
        })
        console.log(response);
        if (response.success === true) {
            ApiHepler.setJwtToken(null);

            button.removeAttribute('disabled')
            button.innerHTML = 'Sign In';
            // lưu accesstoken vào localStorage 
            ApiHepler.storeAccessToken(response.data.access_token);
            $(modal_success).modal('show');
            $('#btnRedirect-dashboard').click(function () {
                //handle redirect link
                window.location.href = '../public/dashboard.html';

            })
            // setTimeout(() => {
            //     window.location.href = '../public/index.html';
            // }, 1000);



            resetForm({
                email,
                password,
            });

        }

    } catch (e) {
        button.removeAttribute('disabled')
        button.innerHTML = 'Sign In';
        console.log(e)
        $('#modalFail').find('.modal-body').html(e.message);
        // console.log(err);
        $(modal_fail).modal('show');


    }
}


// xóa đi thông tin dăng nhập
const resetForm = (data) => {
    data.email.value = '';
    data.password.value = '';



}


const inputs = document.querySelectorAll(".input-field");
// const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

inputs.forEach((inp) => {
    inp.addEventListener("focus", () => {
        inp.classList.add("active");
    });
    inp.addEventListener("blur", () => {
        if (inp.value != "") return;
        inp.classList.remove("active");
    });
});

// toggle_btn.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     main.classList.toggle("sign-up-mode");
//   });
// });

function moveSlider() {
    let index = this.dataset.value;

    let currentImage = document.querySelector(`.img-${index}`);
    images.forEach((img) => img.classList.remove("show"));
    currentImage.classList.add("show");

    const textSlider = document.querySelector(".text-group");
    textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

    bullets.forEach((bull) => bull.classList.remove("active"));
    this.classList.add("active");
}

bullets.forEach((bullet) => {
    bullet.addEventListener("click", moveSlider);
});