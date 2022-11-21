import ApiHepler from "../services/services.js";
import { BASE1_URL } from "../constants/constants.js";
import { parseObjectToFormData } from "../utils/function.js";
import {
  emailValidate,
  namelValidate,
  phoneValidate,
  addressValidate,
  avatarValidate,
} from "../utils/function.js";

let name = document.querySelector(".name");
console.log(name.value);
let email = document.querySelector(".email");
let tel = document.querySelector(".tel");
let address = document.querySelector(".address");
let avatar = document.querySelector(".avatar");
let description = document.querySelector(".desc");
const customerAddButton = document.querySelector(".addCustomer");
const deleteConfirm = document.querySelector(".delete-confirm");
const getToken = localStorage.getItem("token");
const editConfirm = document.querySelector(".editConfirm");

customerAddButton.addEventListener("click", (e) => {
  let validEmail = emailValidate(email);
  let validPhone = phoneValidate(tel);
  let validAddress = addressValidate(address);
  let validName = namelValidate(name);
  let validAvatar = avatarValidate(avatar);
  let checkValidate =
    validEmail && validAddress && validName && validPhone && validAvatar;
  if (checkValidate) {
    const object = {
      name: name.value,
      email: email.value,
      tel: tel.value,
      address: address.value,
      description: description.value,
      avatar: avatar.value,
    };

    saveCustomer(object);
  }
});

const saveCustomer = async (values) => {
  try {
    ApiHepler.setJwtToken(getToken);
    const response = await ApiHepler.post({
      path: "customer/save",
      payload: JSON.stringify(values),
    });
    console.log("responseSaveCustomer", response);
    if (response.success === true) {
      alert("Them thanh cong");
      getListCustomer();
    }
  } catch (error) {
    console.log("error", error);
  }
};
const body = {
  page: 1,
};

const getListCustomer = async () => {
  try {
    ApiHepler.setJwtToken(getToken);
    const resposne = await ApiHepler.get({
      path: "customer/list",
      params: body,
    });

    if (resposne.success === true) {
      renderTable(resposne.data.result);
    }
  } catch (e) {
    console.log(e);
  }
};
const renderTable = (data) => {
  const table = document.querySelector("#datatablesSimple");
  const tbody = table.querySelector("tbody");
  tbody.innerHTML = "";
  data.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td class = "img"><img src= "${item.avatar}" style="width:100px"/></td>
        <td class = "nem">${item?.name}</td>
        <td class = "imeo">${item?.email}</td>
        <td class = "theo">${item?.tel}</td>
        <td >
            <button  class="btn btn-warning update"  data-id='${item.id}' )">Update</button>
            <button  class="btn btn-danger delete"  data-id='${item.id}'>Delete</button>
        
        </td>
              `;
    tbody.appendChild(tr);
  });
};

const deleteCustomer = async (id) => {
  try {
    ApiHepler.setJwtToken(getToken);
    console.log(`id`, id);
    const response = await ApiHepler.get({
      path: `customer/delete/${id}`,
      params: {},
    });
    console.log("responseSaveCustomer", response);
    if (response.success === true) {
      location.reload();
    }
  } catch (error) {
    console.log("error", error);
  }
};

if (getToken) {
  getListCustomer({ page: BASE1_URL }, getToken);
} else {
  window.location.href = "../public/login.html";
}
await getListCustomer();

const deleteButton = document.querySelector(".delete");
deleteButton.addEventListener("click", function (e) {
  let id = this.getAttribute("data-id");

  $("#deleteModal").modal("show");
  deleteConfirm.addEventListener("click", function (e) {
    deleteCustomer(id);
    $("#deleteModal").modal("hide");
  });
  getListCustomer();
});

$(document).on("click", ".update", function () {
  let id = this.getAttribute("data-id");

  let node = this.parentNode.parentNode;
  let dataName = node.querySelector(".nem");
  let dataEmail = node.querySelector(".imeo");
  let dataTel = node.querySelector(".theo");
  let dataIMG = node.querySelector(".img");
  $(".name").val(dataName.innerText);
  $(".email").val(dataEmail.innerText);
  $(".tel").val(dataTel.innerText);
  $(".avatar").val(dataIMG.innerText);
  console.log($(".name"));
  console.log();
  let updateName = $(".name")[1].value;
  let updateEmail = $(".email").val();
  let updateTel = $(".tel").val();
  let updateAvatar = $(".avatar").val();
  const objectUpdate = {
    name: updateName,
    emal: updateEmail,
    tel: updateTel,
    avatar: updateAvatar,
  };
  console.log("objectUpdate", objectUpdate);

  $("#updateModal").modal("show");
  editConfirm.addEventListener("click", function (e) {
    const updateCustomer = async (id) => {
      try {
        ApiHepler.setJwtToken(getToken);
        let updateName = $(".name")[1].value;
        let updateEmail = $(".email")[1].value;
        let updateTel = $(".tel")[1].value;
        let updateAvatar = $(".avatar")[1].value;
        const response = await ApiHepler.post({
          path: `customer/update/${id}`,
          payload: JSON.stringify({
            name : updateName,
            email:updateEmail,
            tel:updateTel,
            avatar:updateAvatar
          }),
        });
        console.log("response", response);
        console.log("updateName", updateName);
        if (response.success === true) {
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    updateCustomer(id, objectUpdate);
    getListCustomer(objectUpdate);
  });
});
