// for user wrong input
function showWarning(warning) {
    document.getElementById("textWarning").innerText = warning;
}

// output for user search
function findingMeals(meals) {
    document.getElementById("meal-list").innerHTML = "";

    meals.forEach(meal => {
        const Div = document.createElement("div");
        Div.innerHTML = `
        <div onclick='mealDetails("${meal.idMeal}")' class="mealCard">
            <img src="${meal.strMealThumb}" class="meal-image">
            <h5 class="meal-title">${meal.strMeal}</h5>
        </div>
        `;
        document.getElementById("meal-list").appendChild(Div);
    });
}

// adding eventlistener for search button
document.getElementById("searchButton").addEventListener("click", function () {
    document.getElementById("mealDetails").style.display = 'none';
    const inputName = document.getElementById("mealName").value;
    if (inputName === "") {
        showWarning("You must enter a meal name")
    }else {
        //calling API by name
        const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputName}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.meals === null) {
                    showWarning("Sorry!! No meals found.")
                }else {
                    findingMeals(data.meals);
                }
            })
    }
    document.getElementById("mealName").value = "";
})

//getting details for clicked meal
function mealDetails(Id) {
    //calling API by ID
    const url=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${Id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayMealDetails(data.meals[0]);
        })
}

//to create ingredients list and show particular meal image
function displayMealDetails(meal) {
    const ingredients=`
    <div class="text-center">
        <img src="${meal.strMealThumb}" class="img">
        <h3 class="title">${meal.strMeal}</h3>
    </div>
    <div>
        <h4>Ingredients</h4>
         <ul id="list">
        </ul>
    </div>
    `
    document.getElementById("showDetails").innerHTML = ingredients;
    //for accessing ingredients
    for (let index = 1; index <= 20; index++) {
        let ingredient = 'strIngredient' + index;
        let number = 'strMeasure' + index;
        if (meal[ingredient] == null || meal[ingredient] === "" ) {
            break;
        }
        const li = document.createElement("li");
        const item=`
        <li>${meal[number]} ${meal[ingredient]}</li>
        `;
        li.innerHTML = item;
        document.getElementById("list").appendChild(li)
    }
    document.getElementById("mealDetails").style.display = "block";
}
