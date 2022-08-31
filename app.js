const getData = async (prefix, limit, page) => {
  try {
    const response = await fetch(
      "https://call-rates-api.herokuapp.com/rates?" +
        new URLSearchParams({
          limit: limit,
          page: page,
          prefix: prefix,
        })
    );
    const data = await response.json();
    return data.result;
  } catch (err) {
    console.log(error);
    return 0;
  }
};

const loadIntoTable = async (getData, table, prefix, limit, page) => {
  const tableHead = table.querySelector("thead");
  const tableBody = table.querySelector("tbody");
  const data = await getData(prefix, limit, page);

  // clear the table
  tableHead.innerHTML = "<tr><tr>";
  tableBody.innerHTML = "";

  for (const headerText of Object.keys(data[0])) {
    const headerElement = document.createElement("th");
    headerElement.textContent = headerText;
    tableHead.querySelector("tr").appendChild(headerElement);
  }
  for (const row of data) {
    const rowElement = document.createElement("tr");
    for (const cellText of Object.keys(row)) {
      const cellElement = document.createElement("td");
      cellElement.textContent = row[cellText];
      rowElement.appendChild(cellElement);
    }
    tableBody.appendChild(rowElement);
  }
};

let input = document.querySelector(".input");
let submit = document.querySelector(".submit");

submit.addEventListener("click", () => {
  if (input.value) {
    loadIntoTable(getData, document.querySelector("table"), input.value, 20, 1);
    input.value = "";
  }
});
