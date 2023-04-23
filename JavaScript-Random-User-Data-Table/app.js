let numPeople = localStorage.getItem("numPeople");
if (numPeople === null) {
  numPeople = 1;
} else {
  numPeople = parseInt(numPeople);
}
// array as global vars
const columns = [
  { name: "id", generator: () => faker.random.uuid() },
  { name: "firstName", generator: () => faker.name.firstName() },
  { name: "lastName", generator: () => faker.name.lastName() },
  { name: "email", generator: () => faker.internet.email() },
  { name: "phone", generator: () => faker.phone.phoneNumber() },
  { name: "address", generator: () => faker.address.streetAddress() },
  { name: "city", generator: () => faker.address.city() },
  { name: "state", generator: () => faker.address.state() },
  { name: "country", generator: () => faker.address.country() },
  { name: "zipCode", generator: () => faker.address.zipCode() },
];

function generateData(numRows) {
  const data = [];
  for (let i = 0; i < numRows; i++) {
    const row = {};
    for (const column of columns) {
      row[column.name] = column.generator();
    }
    data.push(row);
  }

  return data;
}

const jsonData = generateData(numPeople);

const body = document.querySelector("body");
// =============================================================

const inputContainer = document.getElementById("inputContainer");

// creating input
const searchInput = document.createElement("input");

const NumOfPeople = document.createElement("div");
NumOfPeople.textContent = `Number of people: ${numPeople}`;

const btnDecrease = document.createElement("span");
const imgElementDecrease = document.createElement("img");
imgElementDecrease.src = "./images/up-arrow.png";
imgElementDecrease.style.width = "20px";
imgElementDecrease.style.rotate = "180deg";
btnDecrease.appendChild(imgElementDecrease);

const btnIncrease = document.createElement("span");
const imgElementIncrease = document.createElement("img");
imgElementIncrease.src = "./images/up-arrow.png";
imgElementIncrease.style.width = "20px";
btnIncrease.appendChild(imgElementIncrease);

btnIncrease.addEventListener("click", function () {
  numPeople++;
  localStorage.setItem("numPeople", numPeople);
  NumOfPeople.textContent = `Number of people: ${numPeople}`;
  const newData = generateData(1);
  const tableRow = document.createElement("tr");
  for (const column of columns) {
    const tableCell = document.createElement("td");
    tableCell.textContent = newData[0][column.name];
    tableRow.appendChild(tableCell);
  }
  table.appendChild(tableRow);
});

btnDecrease.addEventListener("click", function () {
  if (numPeople > 1) {
    numPeople--;
    localStorage.setItem("numPeople", numPeople);
    NumOfPeople.textContent = `Number of people: ${numPeople}`;
    const tableRows = table.getElementsByTagName("tr");
    if (tableRows.length > 1) {
      table.removeChild(tableRows[tableRows.length - 1]);
    }
  } else {
    alert("We need at least one.");
  }
});

inputContainer.appendChild(searchInput);
inputContainer.appendChild(btnDecrease);
inputContainer.appendChild(NumOfPeople);
inputContainer.appendChild(btnIncrease);

// =============================================================

// creating table container
const table = document.getElementById("tableContainer");

// creating table row
const tableHeaderRow = document.createElement("tr");

// then we are getting the headers like(id,firstName and so on)
for (const column of columns) {
  const tableHeaderCell = document.createElement("th");
  tableHeaderCell.style.padding = 20 + "px " + 8 + "px";
  tableHeaderCell.textContent = capitalizeFirstLetter(column.name);
  tableHeaderRow.appendChild(tableHeaderCell);
}

// Appending the table header row to the table
table.appendChild(tableHeaderRow);

// creating table rows and cells
for (const row of jsonData) {
  const tableRow = document.createElement("tr");
  for (const column in row) {
    const tableCell = document.createElement("td");
    tableCell.textContent = row[column];
    tableRow.appendChild(tableCell);
  }
  table.appendChild(tableRow);
}

// function for capitalizing the word (words ...)
function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// checking if there is exist inputted value in the table
searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();

  const rows = table.getElementsByTagName("tr");
  // we do not want to check the first row (header) so we are starting form 1 to ...length - 1;
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    let showRow = false;
    const cells = row.getElementsByTagName("td");
    for (const cell of cells) {
      if (cell.textContent.toLowerCase().includes(searchTerm)) {
        showRow = true;
        break;
      }
    }
    if (showRow) {
      row.style.display = "table-row";
    } else {
      row.style.display = "none";
    }
  }
});

// go top button appears when Y = 200 ...
const topLink = document.querySelector(".top-link");
window.addEventListener("scroll", function () {
  // console.log(window.pageYOffset);
  const scrollHeight = window.pageYOffset;

  if (scrollHeight > 150) {
    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});

// going to top
topLink.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
  });
});



// ================================================================
// FOOTER 

// const links = [
//   "https://github.com/saidali-ibn-zafar",
//   "https://t.me/zikirillayev",
//   "https://instagram.com/saidali_ibn_zafar",
// ];
// const linksText = ["GitHub", "Telegram", "Instagram"];

// const footer = document.createElement("footer");
// footer.classList.add("footerContainer");


// for (let i = 0; i < 3; i++) {
//   const footerDiv = document.createElement("div");
//   footerDiv.classList.add("footerDiv");
//   footer.appendChild(footerDiv);

//   if (i === 0) {
//     for (let j = 0; j < 3; j++) {
//       footerDiv.classList.add("footerDiv1");
//       const link = document.createElement("a");
//       link.href = links[j];
//       link.textContent = linksText[j];
//       footerDiv.appendChild(link);
//     }
//   }

//   if (i === 1) {
//     // THINKING WHAT I CAN ADD
//   }

//   if (i === 2) {
//     // THINKING WHAT I CAN ADD
//   }
// }

// body.appendChild(footer);

// ================================================================
// END OF FOOTER 

// storing to local storage
localStorage.setItem("numPeople", numPeople);

