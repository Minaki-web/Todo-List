const inpTask = document.querySelector(".inpTask");
const btnTask = document.querySelector(".btnTask");
const ul = document.querySelectorAll(".list-todo");

btnTask.addEventListener("click", (e) => {
  e.preventDefault();

  if (inpTask.value === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "This is Invalid value.",
    });
    return false;
  }

  Swal.fire({
    position: "bottom-end",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500,
  });

  const li = document.createElement("li");
  const p = document.createElement("p");
  p.textContent = inpTask.value;

  const btnDelete = document.createElement("button");
  btnDelete.classList.add("finish");
  btnDelete.innerHTML = '<i class="far fa-trash-alt"></i>';

  li.append(btnDelete);
  li.append(p);
  ul[0].appendChild(li);

  inpTask.value = null;

  const dataLists = ul[0].innerHTML;
  let jsonData = JSON.stringify(dataLists);
  localStorage.setItem("data", jsonData);
  location.reload();
  return false;
});

const jsonItems = localStorage.getItem("data");
const jsonObj = JSON.parse(jsonItems);
document.querySelector(".list-todo").innerHTML = jsonObj;

const btnDeleteArr = document.querySelectorAll(".finish");
for (let i = 0; i < btnDeleteArr.length; i++) {
  const arr = btnDeleteArr[i];
  arr.addEventListener("click", function () {
    Swal.fire({
      title: "Are you sure?",
      text: "You are trying to delete the task!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (!result.isConfirmed) {
        return false;
      }
      const listItem = this.parentNode;
      listItem.remove();
      localStorage.clear();
      const afterDeleteDataLists = ul[0].innerHTML;
      jsonData = JSON.stringify(afterDeleteDataLists);
      localStorage.setItem("data", jsonData);
      location.reload();
    });
  });
}

const btnDeleteAll = document.querySelector(".btnDeleteAll");
btnDeleteAll.addEventListener("click", (e) => {
  e.preventDefault();
  Swal.fire({
    title: "Are you sure?",
    text: 'You are trying to delete "ALL TASKS"!!!',
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (!result.isConfirmed) {
      return false;
    }
    localStorage.clear();
    location.reload();
  });
});

// JQuery ver.

// $(".btnTask").on("click", (e) => {
//   e.preventDefault();

//   const Text = $(".inpTask").val();
//   const btnDelete = "<button class='finish'>Done</button>";
//   const liTagSet = "<li>" + Text + btnDelete + "</li>";

//   if (Text === "") {
//     alert("Invalid Content.");
//     return false;
//   } else {
//     $(".list-todo").append(liTagSet);
//   }

//   $(".inpTask").val(null);

//   const dataLists = $(".list-todo").html();
//   let jsonData = JSON.stringify(dataLists);
//   localStorage.setItem("data", jsonData);

//   location.reload();
// });

// const jsonItems = localStorage.getItem("data");
// const jsonObj = JSON.parse(jsonItems);

// $(".list-todo").append(jsonObj);

// $(".finish").on("click", () => {
//   if (!confirm("You are trying to delete the task. Is it OK?")) {
//     return false;
//   } else {
//     const listItem = $(this).parent();
//     listItem.fadeOut(200, () => {
//       $(this).remove();
//       localStorage.clear();
//       const afterDeleteDataLists = $(".list-todo").html();
//       jsonData = JSON.stringify(afterDeleteDataLists);
//       localStorage.setItem("data", jsonData);
//     });
//   }
// });
