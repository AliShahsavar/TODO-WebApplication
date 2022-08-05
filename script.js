let input = document.getElementById("input");
const addIcon = document.getElementById("addIcon");
const sweepIcon = document.getElementById("sweepIcon");
const todosNote = document.querySelector(".todosNote");
let clearTodos = document.getElementById("sweepIcon");
sweepIcon.onclick = function () {
  if (todosNote.innerHTML == "") {
    Swal.fire({
      icon: "error",
      title: "You dont have any notes",
      text: "Make sure you created a todo and try again ",
      showCancelButton: true,
    });
  } else {
    Swal.fire({
      icon: "info",
      title: "Clear all note?",
      text: "If you accepted, your all todos was be deleted!",
      showCancelButton: true,
    }).then(function (sweepIconResult) {
      if (sweepIconResult.isConfirmed) {
        todosNote.innerHTML = "";
      }
    });
  }
};
addIcon.addEventListener("click", function () {
  if (input.value == "") {
    Swal.fire({
      icon: "error",
      title: "Fill form!",
      text: "Please fill form and then press add note again!",
    });
  } else {
    let createUlElem = document.createElement("ul");
    let createSpanElem = document.createElement("span");
    let createLiElem = document.createElement("li");
    let createIElemCheck = document.createElement("i");
    let createIElemDelete = document.createElement("i");
    createSpanElem.innerHTML = input.value;
    createIElemCheck.className = "material-symbols-outlined";
    createIElemCheck.innerHTML = "check";
    createIElemDelete.className = "material-symbols-outlined";
    createIElemDelete.innerHTML = "delete";
    createLiElem.append(createIElemCheck, createIElemDelete);
    createUlElem.append(createSpanElem, createLiElem);
    todosNote.append(createUlElem);
    createIElemCheck.addEventListener("click", passTodo);
    function passTodo(e) {
      createIElemCheck.innerHTML = "close";
      e.path[2].style.background = "#2eb086";
      createIElemCheck.removeEventListener("click", passTodo);
      createIElemCheck.addEventListener("click", unsetTodo);
    }
    function unsetTodo(e) {
      createIElemCheck.innerHTML = "check";
      e.path[2].style.background = "#b8405e";
      createIElemCheck.removeEventListener("click", unsetTodo);
      createIElemCheck.addEventListener("click", passTodo);
    }
    createIElemDelete.addEventListener("click", function (e) {
      Swal.fire({
        title: "Are you sure?",
        text: "You have delete this note!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(function (result) {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your note has been deleted.", "success");
          e.path[2].remove();
        }
      });
    });
    input.value = "";
  }
});
