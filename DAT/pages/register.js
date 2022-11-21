import ApiHelper from "../services/services.js";
import {
  namelValidate,
  passwordValidate,
  emailValidate,
  passwordMatch,
} from "../utils/function.js";
const name = document.querySelector(".name");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const confirm_password = document.querySelector(".confirm_password");
const button = document.querySelector(".register-submit");
const form = document.querySelectorAll(".inputs");
const togglePassword = document.querySelectorAll(".toggle");

togglePassword.forEach((item) => {
  item.addEventListener("click", function () {
    const input = this.previousElementSibling;
    const inputType = input.getAttribute("type");
    if (inputType === "password") {
      input.setAttribute("type", "text");
    } else {
      input.setAttribute("type", "password");
    }
  });
});

button.addEventListener("click", (e) => {
  let validEmail = emailValidate(email);
  let validPassword = passwordValidate(password, 8, 16);

  let validName = namelValidate(name);
  let validPasswordMatch = passwordMatch(password, confirm_password);
  if (validEmail && validPassword && validPasswordMatch && validName) {
    const object = {
      email: email.value,
      password: password.value,
      name: name.value,
      confirm_password: confirm_password.value,
    };
    console.log("Object", object);
    register(object);
  } else {
    swal({
      title: "Register Failed",
      text: "Nhập lại đi bạn ơi",
      icon: "error",
    });
  }
});

const register = async (values) => {
  try {
    ApiHelper.setJwtToken(null);
    button.setAttribute("disabled", true);
    button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="visually-hidden">Register...</span>`;
    const resposne = await ApiHelper.post({
      path: "auth/register",
      payload: JSON.stringify(values),
    });
    if (resposne.success === true) {
      button.removeAttribute("disabled");
      button.innerHTML = "";
      swal({
        title: "Register Success",

        icon: "success",
      }).then((willRedirect) => {
        resetForm({ name, email, password, confirm_password });
        form.forEach((item) => {
          item.classList.remove("success");
        });
        if (willRedirect) {
          setTimeout(function () {
            window.location.href = "../public/login.html";
          }, 2000);
        }
      });
    }
  } catch (error) {
    button.innerHTML = "Register";
    swal({
      title: "Register Failed",
      

      icon: "error",
    });
    button.removeAttribute("disabled");
  
  }
};
const resetForm = (data) => {
  data.name.value = "";
  data.email.value = "";
  data.password.value = "";
  data.confirm_password.value = "";
  data.passwordConfirm = "";
};
