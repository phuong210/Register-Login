export const parseObjectToFormData = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  return formData;
};
export const objectToQueryString = (obj, prefix) => {
return Object.keys(obj).map(objKey => {
    if (obj.hasOwnProperty(objKey)) {
        const key = prefix ? `${prefix}[${objKey}]` : objKey;
        const value = obj[objKey];

        return typeof value === "object" ?
            this.objectToQueryString(value, key) :
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }
    return null;
}).join("&");
}
export const handleErrors = (response) => {
if ([200, 201].includes(response.status)) {
  return response
}

throw response
}
export const useLoading = (status) => {
const loading = status;
async function withLoading(callback) {
  loading = true;
  try {
    const response = await callback()
    loading = false;
    return response
  } catch (error) {
    loading = false;
    throw error
  }
}
return [ loading, withLoading ]
}
export default useLoading
export const setError = (input, message) => {
const inputControl = input.parentElement;
const errorDisplay = inputControl.querySelector(".error");

errorDisplay.innerText = message;
inputControl.classList.add("error");
inputControl.classList.remove("success");
};

export const setSuccess = (input) => {
const inputControl = input.parentElement;
const errorDisplay = inputControl.querySelector(".error");

errorDisplay.innerText = "";
inputControl.classList.add("success");
inputControl.classList.remove("error");
};

export const namelValidate = (name) => {
let checkName = false;
const nameValue = name.value.trim();
if (!nameValue) {
  setError(name, "Name is required");
  
} else {
  setSuccess(name);
 
}
return !checkName;
};
export const passwordValidate = (password,min,max) => {
let checkPassword = false;
const passwordValue = password.value.trim();

if (!passwordValue) {
  setError(password, "Password is required");

}
else if (passwordValue.length < min ) {
  setError(password, `Password must be at least ${min} character.`);

} else if (passwordValue.length > max ) {
  setError(password, `Password must be less than ${max} character.`);

}
else if (
  !/[A-Z]/.test(passwordValue) 
) {
  setError(
    password,
    "password should contain at least 1 uppercase character"
  );

} else if (
  !/[0-9]/.test(passwordValue)
 ) {
  setError(password, "password should contain at least 1 number character");

} else if (
  !/[$@%^&*()}{[\]}!]/.test(passwordValue)
) {
  setError(password, "password should contain at least 1 special character");

} else {
  setSuccess(password);

}
return !checkPassword
};
export const isValidEmail = (email) => {
const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
return regexEmail.test(String(email).toLowerCase());
};
export const emailValidate = (email) => {
let checkEmail = false;
const emailValue = email.value.trim();
if (!emailValue) {
  setError(email, "Email is required");
 
} else if (!isValidEmail(emailValue)) {
  setError(email, "Provide a valid email address");
 
} else {
  setSuccess(email);
  
}
return !checkEmail;

};

export const phoneValidate = (phone)=>{
let checkPhone = false ;
const phoneValue = phone.value.trim();
if(!phoneValue){
  setError(phone,'Phone is required')
} else if (/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(phoneValue)){
  setError(phone,'Please retype phone')
}
else{
  setSuccess(phone);
}
return !checkPhone;
}
export const passwordMatch = (password, confirm_password) => {
let checkPasswordMatch = false;
const passwordValue = password.value.trim();
const passwordConfirmValue = confirm_password.value.trim();
if (!passwordConfirmValue) {
  setError(confirm_password, "Please confirm your password");
} else if (passwordConfirmValue !== passwordValue) {
  setError(confirm_password, "Passwords doesn't match");
} else {
  setSuccess(confirm_password);
}
return !checkPasswordMatch;
};


export const addressValidate = (address) =>{
let checkAddress = false;
const addressValue = address.value.trim();
if (!addressValue) {
  setError(address, "Address is required");
  
} else {
  setSuccess(address);
 
}
return !checkAddress;
}

export const avatarValidate = (avatar)=>{
let checkAvatar = false;


const avatarValue = avatar.value.replace(/\.[^.$]+$/, '').trim();
if(!avatarValue){
  setError(avatar,"Avatar is required")
}
else if( /\.(jpe?g|png)$/.test(avatar)){
  setError(avatar,"Invalid Avatar")
}
else{
  setSuccess(avatar);
}
return !checkAvatar;
}
