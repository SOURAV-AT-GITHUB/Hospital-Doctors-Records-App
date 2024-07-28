// fill in javascript code here
let form = document.getElementById("form");
let tbody = document.getElementById("tbody");
var data = [];

function loadData() {
  let StoredData = JSON.parse(localStorage.getItem("data"));
  if (StoredData) {
    data = StoredData;
    showData(data);
  }
}

function submitbtn(event) {
  let obj = {
    Docname: event.target[0].value,
    DocId: event.target[1].value,
    Specialization: event.target[2].value,
    Experience: event.target[3].value,
    Email: event.target[4].value,
    Mobile: event.target[5].value,
    Role: checkRole(event.target[3].value),
  };
  data.push(obj);
  localStorage.setItem("data", JSON.stringify(data));
  event.target[0].value = null;
  event.target[1].value = null;
  event.target[2].value = null;
  event.target[3].value = null;
  event.target[4].value = null;
  event.target[5].value = null;
}

function showData(data) {
  tbody.innerHTML = "";
  data.forEach(function (element) {
    let tr = document.createElement("tr");

    let Docname = document.createElement("td");
    Docname.innerText = element.Docname;

    let DocId = document.createElement("td");
    DocId.innerHTML = element.DocId;

    let Specialization = document.createElement("td");
    Specialization.innerText = element.Specialization;

    let Experience = document.createElement("td");
    Experience.innerText = element.Experience;

    let Email = document.createElement("td");
    Email.innerText = element.Email;

    let Mobile = document.createElement("td");
    Mobile.innerText = element.Mobile;

    let Role = document.createElement("td");
    Role.innerText = element.Role;

    let Dlt = document.createElement("td");
    Dlt.innerHTML = "<button/> Delete";
    Dlt.addEventListener("click", function () {
      DeleteButton(element.DocId);
    });

if(element.Role=="Senior"){
    tr.style.backgroundColor="#8baace"
}

    tr.append(
      Docname,
      DocId,
      Specialization,
      Experience,
      Email,
      Mobile,
      Role,
      Dlt
    );

    tbody.append(tr);
  });
}
function checkRole(exp) {
  if (exp > 5) {
    return "Senior";
  } else if (exp >= 2 && exp < 5) {
    return "junior";
  } else if (exp <= 1) {
    return "Trainee";
  }
}

function DeleteButton(id) {
  data = data.filter(function (element) {
    return element.DocId != id;
  });
  //   console.log("Running")
  localStorage.setItem("data", JSON.stringify(data));
  showData(data);
}

function checkDuplicate(id) {
  let count = 0;
  data.forEach(function (element) {
    if (element.DocId == id) {
      count++;
    }
  });
  return count;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (event.target[0].value == "") {
    alert("Please enter the Doctor's name before submitting");
  } else if (event.target[1].value == "") {
    alert("Doctor's ID Can not be Empty, Please Fill the Doctor ID");
  } else if (event.target[1].value != "") {
    let match = checkDuplicate(event.target[1].value);
    if (match > 0) {
      alert(
        "Doctor with the same ID is Already Registered, Please Use Other/Correct ID"
      );
    } else {
      submitbtn(event);
      showData(data);
    }
  }
});

loadData(data);
