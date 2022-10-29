const form = document.querySelector("form");
const ageInput = document.querySelector("#age");
const relInput = document.querySelector("#rel");
const smokerInput = document.querySelector("#smoker");
const addButton = document.querySelector(".add");
addButton.setAttribute("type", "button");
let household = new Map();
let num = 0;

// Create household display
const newDiv = document.createElement("div");
newDiv.setAttribute("id", "household");
form.append(newDiv);

const clearForm = () => {
  ageInput.value = null;
  relInput.value = null;
  smokerInput.checked = false;
};

const addMember = () => {
  // Get input values
  const age = ageInput.value;
  const relationship = relInput.value;
  const smoker = smokerInput.checked;

  // Validate input values
  if (age <= 0 && relationship) {
    alert("Age must be greater than 0");
  } else if (age > 0 && !relationship) {
    alert("Please enter a relationship");
  } else if (age <= 0 && !relationship) {
    alert("Age must be greater than 0 and relationship is required");
  } else if (age > 0 && relationship) {
    // Once validated, add member to household
    num++;
    const memberNumber = `member${num}`;

    household.set(memberNumber, {
      age: age,
      rel: relationship,
      smoker: smoker,
    });

    // Display household in DOM
    const member = household.get(memberNumber);

    document.querySelector("#household").insertAdjacentHTML(
      "beforeend",
      `<div id="${memberNumber}" style="display:flex;align-items:center">
            <h3 style="margin-right:20px">Relationship: ${member.rel} / Age: ${member.age} / Smoker: ${member.smoker}</h3>
            <button style="height:75%" id="${memberNumber}-button">Delete</button>
        </div>`
    );
    document
      .getElementById(`${memberNumber}-button`)
      .addEventListener("click", function () {
        document.getElementById(`${memberNumber}`).remove();
        household.delete(memberNumber);
      });

    clearForm();
  }
};

addButton.addEventListener("click", () => {
  addMember();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const debug = document.querySelector(".debug");

  let serializedHousehold = JSON.stringify(Array.from(household.entries()));

  if (debug.innerHTML) {
    debug.innerHTML = "";
    debug.insertAdjacentHTML("beforeend", `<div>${serializedHousehold}</div>`);
  } else {
    debug.insertAdjacentHTML("beforeend", `<div>${serializedHousehold}</div>`);
  }
  debug.setAttribute("style", "display:block");

  clearForm();
});
