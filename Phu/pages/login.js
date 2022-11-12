import ApiHepler from "../services/services.js";
import {
    parseObjectToFormData
} from '../utils/function.js'
let email = document.querySelector('.email')
let password = document.querySelector('.password')
let button = document.querySelector('.login-submit')
button.addEventListener('click', function () {
    const object = {
        email: email.value,
        password: password.value,
    };
    login(object);
})
const login = async (object) => {
    try {
        ApiHepler.setJwtToken(null);
        button.setAttribute('disabled', true)
        button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="visually-hidden">Login...</span>`;
        const resposne = await ApiHepler.post({
            path: 'auth/login',
            payload: parseObjectToFormData(object)
        })
        if (resposne.success === true) {
            button.removeAttribute('disabled')
            button.innerHTML = 'login';
            // ApiHepler.storeAccessToken(resposne.data.access_token);
            resetForm({
                email,
                password
            })
            // window.location.href = '../public/index.html';
        }
    } catch (e) {
        alert(e)
    }
}

login();
const resetForm = (data) => {
    data.email.value = '';
    data.password.value = ''
}