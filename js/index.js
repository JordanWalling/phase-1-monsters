document.addEventListener("DOMContentLoaded", initialise);

function initialise() {
  let monsters = []; // Array to store all monsters
  let currentPage = 1;
  const pageSize = 20;
  let totalPages = 1;

  const monstersContainer = document.querySelector("#monster-container");
  const back = document.querySelector("#back");
  const forward = document.querySelector("#forward");
  const nameInput = document.querySelector("#monster-name");
  const ageInput = document.querySelector("#monster-age");
  const descInput = document.querySelector("#monster-desc");
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let newMonster = {
      name: nameInput.value,
      age: ageInput.value,
      description: descInput.value,
    };

    fetch("http://localhost:3000/monsters", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMonster),
    })
      .then((resp) => resp.json())
      .catch((error) => console.error(error));
  });

  back.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayMonsters();
    }
  });

  forward.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayMonsters();
    }
  });

  fetchMonsters(); // Fetch all monsters initially

  function fetchMonsters() {
    fetch(`http://localhost:3000/monsters`)
      .then((resp) => resp.json())
      .then((data) => {
        monsters = data; // Store all monsters
        totalPages = Math.ceil(monsters.length / pageSize); // Calculate total pages
        displayMonsters();
      })
      .catch((error) => console.error(error));
  }

  function displayMonsters() {
    monstersContainer.innerHTML = ""; // Clear existing monsters

    const startIndex = (currentPage - 1) * pageSize;
    const monsterSlice = monsters.slice(startIndex, startIndex + pageSize);

    const monsterHTML = monsterSlice
      .map((monster) => {
        const { name, age, description } = monster;
        return `
      <div>
       <h3>${name}</h3>
       <h3>${age}</h3>
       <p>${description}</p>
      </div>
     `;
      })
      .join("");
    monstersContainer.innerHTML = monsterHTML;
  }
}
