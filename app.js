let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const container = document.getElementById("container");
const loader = document.getElementById("loader");
const input = document.getElementById("input-src-value");
const button = document.getElementById("search-btn");
const openModal = document.getElementById("open-modal");
const modalContainer = document.getElementById("modal-container");
const closeModal = document.getElementById("close-modal");

async function fatchRecipes() {
  try {
    loader.style.display = "flex";

    const response = await fetch(url);
    const foodContain = await response.json();
    console.log(foodContain);
    loader.style.display = "none";

    container.innerHTML = "";
    foodContain.meals.forEach((food) => {
      container.innerHTML += `
    <div class="rounded-2xl shadow-2xl">
                <div>
                    <img class="rounded-t-2xl h-[200px] w-full" src="${food.strMealThumb}" alt="${food.strMeal}">
                </div>
                <div class="p-4">
                    <p class="text-lg font-medium">${food.strMeal}</p>
                    <p class="text-xs h-20 overflow-hidden">${food.strInstructions}</p>
                    <div class="flex justify-end mt-2">
                        <button class="view-details-btn bg-[#FF9B45] px-4 py-1 rounded-md text-white" data-id="${food.idMeal}">VIEW DETAILS </button>
                    </div>
                </div>
            </div>
    `;
    });

    document.querySelectorAll(".view-details-btn").forEach(function (element) {
      element.addEventListener("click", function (e) {
        e.preventDefault();
        let foodId = this.dataset.id;
        async function showModal() {
          loader.style.display = "flex";
          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`
          );
          const data = await res.json();
          loader.style.display = "none";
          console.log(data.meals[0].strMeal);

          modalContainer.innerHTML = "";
          modalContainer.innerHTML = `
            <div>
              <img class="rounded-t-md w-full h-[250px]" src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strMeal}">
            </div>
            <p class="p-2  h-[100px] overflow-y-auto">${data.meals[0].strInstructions}</p>
            <div class="flex justify-center items-center">
                <button id="close-modal-js" class="bg-[#D5451B] my-2  px-5 py-2 rounded-md text-white">Close</button>
            </div>
            `;

          document
            .getElementById("close-modal-js")
            .addEventListener("click", function (e) {
              e.preventDefault();
              openModal.classList.remove("flex");
              openModal.classList.add("hidden");
              modalContainer.innerHTML = "";
            });
        }
        showModal();

        openModal.classList.remove("hidden");
        openModal.classList.add("flex");
      });
    });
  } catch (error) {
    console.error(error);
    loader.style.display = "none";
    container.innerHTML = `<p class="text-red-500 text-center col-span-full">Failed to load data!</p>`;
  }
}
fatchRecipes();

button.addEventListener("click", (e) => {
  e.preventDefault();

  let foodName = input.value.trim();
  url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;

  input.value = "";
  fatchRecipes();
});

document.querySelectorAll(".view-details-btn").forEach(function (element) {
  element.addEventListener("click", function () {
    alert("Details button clicked!");
  });
});
