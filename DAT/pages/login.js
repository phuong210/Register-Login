import ApiHepler from "../services/services.js";
import { parseObjectToFormData } from "../utils/function.js";
import {
  
  passwordValidate,
  emailValidate,
  
} from "../utils/function.js";
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const form = document.querySelectorAll(".inputs");
const button = document.querySelector(".register-submit");

const togglePassword = document.querySelector(".toggle");

togglePassword.addEventListener("click", function () {
  const input = this.previousElementSibling;
  const inputType = input.getAttribute("type");
  if (inputType === "password") {
    input.setAttribute("type", "text");
  } else {
    input.setAttribute("type", "password");
  }
});
button.addEventListener("click", (e) => {
  e.preventDefault();
  let validEmail = emailValidate(email);
  let validPassword = passwordValidate(password,8,16);
 
  if (validEmail && validPassword) {
    const object = {
      email: email.value,
      password: password.value,
      
  };
      login(object);
      console.log("data", object);
 
    
  } else {
    swal("NHẬP LẠI ĐI BẠN ƠI", "", "error");
    
  }
});
const login = async (values) => {
  console.log(values);
  try {
    button.setAttribute("disabled", true);
    button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="visually-hidden">Login...</span>`;
    const resposne = await ApiHepler.post({
      path: "auth/login",
      payload: parseObjectToFormData(values),
    });
   
    if (resposne.success === true) {
      button.removeAttribute('disabled')
      button.innerHTML = "Login";
      ApiHepler.storeAccessToken(resposne.data.access_token);
   
      swal({
        title: "Login Success",
      
        icon: "success",
        
      })
      .then((willRedirect) => {
        resetForm({email,password});
       
        form.forEach((item)=>{
          console.log("123");
        item.classList.remove("success")
      });
        if (willRedirect) {
          setTimeout(function() {
            window.location.href = "../public/index.html";
          }, 3000);
        }
      });

    }

   
    
  } catch (error) {
   
    button.innerHTML = "Login";
    swal({
      title: "Login Failed",
      text: error.message,
      icon: "error",
      
    })
    .then(() => {
     
    form.forEach((item)=>{
    
      item.classList.remove("success")
    });
    button.removeAttribute("disabled");
    });



};
const resetForm = (data) => {
  data.email.value = "";
  data.password.value = "";
 
  data.passwordConfirm = "";
}
}
