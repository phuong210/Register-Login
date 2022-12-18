import ApiHepler from "../services/services.js";
import {
    objectToQueryString,
    parseObjectToFormData
} from '../utils/function.js';
import {
    BASE_URL1
} from "../constants/constants.js";
const getToken = localStorage.getItem("token");
let listTrigger = document.querySelector('#customerList');
let Charts = document.querySelectorAll('.row');
let customerList = document.querySelector('.customerList');
let deleteConfirm = document.querySelector('.btnDelete');
let updateConfirm = document.querySelector('.btnUpdate');
let name = document.querySelector('.name');
let email = document.querySelector('.email');
let address = document.querySelector('.address');
let phone = document.querySelector('.phone');
let modalAdd = document.querySelector('#btnSave');
let image = document.querySelector('#input-add-avatar');
let desc = document.querySelector('.description');
let nameUpdate = document.querySelector('#nameUpdate');
let emailUpdate = document.querySelector('#emailUpdate');
let addressUpdate = document.querySelector('#addressUpdate');
let phoneUpdate = document.querySelector('#phoneUpdate');
let avatarUpdate = document.querySelector('#avatar-update');
let descUpdate = document.querySelector('#descUpdate');
let inputAvatarUpdate = $('#input-update-avatar');
let modal_success = document.querySelector('#modalSuccess');
let modal_fail = document.querySelector('#modalFail');


const logoutButton = document.querySelector('.logout-button');
logoutButton.addEventListener('click', function () {
    logout();
});
const logout = () => {
    localStorage.removeItem('token')
    window.location.reload()
};
const object = {
    page: 1,
}


// HIDE CHART AND SHOW LIST 
listTrigger.addEventListener('click', function (e) {

    for (const chart of Charts) {
        chart.classList.add('d-none');
    };
    customerList.classList.remove('d-none');
    getCustomerList(object);
})

// DELETE
const deleteCustomer = async (id) => {
    try {

        deleteConfirm.setAttribute('disabled', true);
        deleteConfirm.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="visually-hidden">Deleting..</span>`;
        ApiHepler.setJwtToken(getToken);
        console.log(`id`, id);
        const response = await ApiHepler.get({
            path: `customer/delete/${id}`,
            params: {},
        });
        console.log("responseSaveCustomer", response);
        if (response.success === true) {

            deleteConfirm.removeAttribute('disabled')
            deleteConfirm.innerHTML = 'Delete';

            getCustomerList();
            closeModal();
        }
    } catch (e) {
        deleteConfirm.removeAttribute('disabled')
        deleteConfirm.innerHTML = 'Delete';
        console.log(e);
    }
};



// LOADING MODAL
const onLoadingModal = () => {
    $('.modalLoading').modal('show');
}
const offLoadingModal = () => {
    closeModal();
}
// UPDATE 
const closeModal = () => {
    $('.modal').removeClass('in');
    $('.modal').attr("aria-hidden", "true");
    $('.modal').css("display", "none");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
};

// RENDER LIST
const getCustomerList = async () => {

    try {

        onLoadingModal();
        console.log(1);
        ApiHepler.setJwtToken(getToken);
        const response = await ApiHepler.get({
            path: 'customer/list',
            params: objectToQueryString(object)
        })


        if (response.success === true) {
            offLoadingModal();



            let tableData = "";
            response.data.result.map((values) => {
                tableData += `
                <tr>
                <td class="nem">${values.name} </td>
                <td class="imeo">${values.email} </td>
                <td class="theo">${values.tel} </td>
                <td class="adr">${values.address} </td>
                <td class="dep">${values.description} </td>
                <td ><img class="img" src="${values.avatar}"/> </td>
                <td class="d-flex justify-content-center "> <button  class="btn-success btn mr-3 updateItem"
                                                data-toggle="modal" data-target="#modalUpdate" data-id='${values.id}'>Update</button>
                                            <button  class="btn btn-danger deleteItem " data-toggle="modal" data-target="#modalDelete" data-id='${values.id}'
                                               >Delete</button>
                </td>
                </tr>
                `
            })
            document.querySelector('.tableBody').innerHTML = tableData;
            document.querySelectorAll("tbody tr").forEach((row) => {
                //   console.log((this.getAttribute("data-id")));
                // get every row in table
                let deleteButton = row.querySelector(".deleteItem");
                let updateButton = row.querySelector(".updateItem");
                let id_Update = updateButton.getAttribute("data-id");
                let id_Delete = deleteButton.getAttribute("data-id");
                deleteButton.addEventListener("click", function (e) {
                    deleteConfirm.addEventListener("click", function (e) {
                        deleteCustomer(id_Delete);
                    })
                })
            });

        }
    } catch (e) {
        console.log(e);

    }

}

export const showError = (input, message) => {
    let parent = input.parentElement;
    let small = parent.querySelector('small');

    parent.classList.add('error');
    small.innerText = message;

}
export const showSuccess = (input) => {
    let parent = input.parentElement;
    let small = parent.querySelector('small');

    parent.classList.remove('error');
    small.innerText = '';

}
export const validateDescription = (input) => {
    const descriptionValue = input.value.trim();
    if (!descriptionValue) {
        showError(input, 'Field is not blank')
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}
export const validateAddress = (input) => {
    const addressValue = input.value.trim();


    if (!addressValue) {
        showError(input, 'Field is not blank')
        return false;

    } else {
        showSuccess(input);
        return true;
    }
}
export const validatePhone = (input) => {
    const phoneValue = input.value.trim();
    const regexPhone = /(84[3|5|7|8|9])+([0-9]{8})\b/g;
    const regexNumber = /^[0-9]*$/;

    if (!phoneValue) {
        showError(input, 'Field is not blank')
        return false;
    } else if (!regexNumber.test(phoneValue)) {
        showError(input, "field is only allowed number")
    } else if (!regexPhone.test(phoneValue)) {
        showError(input, "Phone number must contains at least 10 charaters")
        return false;

    } else {
        showSuccess(input);
        return true;
    }


}
//  check name
export const validateName = (input) => {
    const nameValue = input.value.trim();
    const regexName = /^([^0-9]*)$/;

    if (!nameValue) {
        showError(input, 'Field is not blank')
        return false;
    } else if (!regexName.test(nameValue)) {
        showError(input, "Number is not allowed")
        return false;

    } else {
        showSuccess(input);
        return true;
    }

}
export const isValidEmail = (email) => {
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



// ADD 
modalAdd.addEventListener('click', function (e) {
    e.preventDefault();
    let checkName = validateName(name);
    let checkEmail = validateEmail(email);
    let checkAddress = validateAddress(address);
    let checkPhone = validatePhone(phone);
    let checkDesc = validateDescription(desc)

    if (checkName && checkEmail && checkAddress && checkPhone && checkDesc) {
        const object = {
            name: name.value,
            email: email.value,
            address: address.value,
            tel: phone.value,
            avatar: image.files[0].name,
            description: desc.value,
        };
        console.log(object);
        addUser(object);
    } else {}
})
const addUser = async (object) => {
    try {
        modalAdd.setAttribute('disabled', true);
        modalAdd.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="visually-hidden">Saving..</span>`;
        ApiHepler.setJwtToken(getToken);
        const response = await ApiHepler.post({
            path: 'customer/save',
            payload: JSON.stringify(object)
        })
        console.log(response);
        if (response.success === true) {
            $(modal_success).modal('show');
            modalAdd.removeAttribute('disabled')
            modalAdd.innerHTML = 'Save';
            getCustomerList();
            // hide modal
            // closeModal();
            resetForm({
                name,
                email,
                address,
                desc,
                phone,
                image,

            });
        }
    } catch (e) {
        modalAdd.removeAttribute('disabled')
        modalAdd.innerHTML = 'Save';
        console.log(e)
        $('#modalFail').find('.modal-body').html(e.message);
        // console.log(err);
        $(modal_fail).modal('show');
    }
}

const resetForm = (data) => {
    data.email.value = '';
    data.name.value = '';
    data.phone.value = '';
    data.address.value = '';
    data.image.value = '';
    data.desc.value = '';



}


$(document).on("click", ".updateItem", function () {
    let id = this.getAttribute("data-id");
    let node = this.parentNode.parentNode;
    let dataName = node.querySelector(".nem");
    let dataEmail = node.querySelector(".imeo");
    let dataTel = node.querySelector(".theo");
    let dataAddress = node.querySelector(".adr");
    let dataDesc = node.querySelector(".dep");
    let dataIMG = node.querySelector(".img");
    console.log(dataIMG);
    let dataAvatar = dataIMG.getAttribute('src');
    console.log(dataAvatar);

    let updateName = $("#nameUpdate");
    let updateEmail = $("#emailUpdate");
    let updateAddress = $("#addressUpdate");
    let updatePhone = $("#phoneUpdate");
    let updateAvatar = $('#avatar-update');
    let updateDesc = $('#descUpdate');

    // $("#updateModal").modal("show");
    updateName.val(dataName.textContent);
    updateAvatar.attr('src', dataAvatar);
    updateEmail.val(dataEmail.textContent);
    updateAddress.val(dataAddress.textContent);
    updatePhone.val(dataTel.textContent);
    updateDesc.val(dataDesc.textContent);

    $(document).on("click", ".btnUpdate", function () {
        updateCustomer(id)
    });
});

const updateCustomer = async (id) => {
    try {

        updateConfirm.setAttribute('disabled', true);
        updateConfirm.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="visually-hidden">Updating..</span>`;
        ApiHepler.setJwtToken(getToken);
        const response = await ApiHepler.post({
            path: `customer/update/${id}`,
            payload: JSON.stringify({
                name: nameUpdate.value,
                email: emailUpdate.value,
                description: descUpdate.value,
                address: addressUpdate.value,
                tel: phoneUpdate.value,
                avatar: inputAvatarUpdate[0].files[0].name,
            })
        })
        console.log(response);
        if (response.success === true) {

            updateConfirm.removeAttribute('disabled');
            updateConfirm.innerHTML = 'Saving Changes';

            getCustomerList();
            // hide modal
            closeModal();
        }
    } catch (e) {
        updateConfirm.removeAttribute('disabled');
        updateConfirm.innerHTML = 'Saving Changes';
        console.log(e);
    }
}

if (getToken) {
    getCustomerList({
        page: BASE_URL1
    }, getToken);
} else {
    window.location.href = "../public/login.html";
}


window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const datatablesSimple = document.getElementById('datatablesSimple');
    if (datatablesSimple) {
        new simpleDatatables.DataTable(datatablesSimple);
    }
});