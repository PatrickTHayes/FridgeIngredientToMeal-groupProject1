//function checking firebase for ingredient list - if condition
//if no list exists create empty array
var ingrCount = 0
var listOfIngredients = [];
// Creating a div with the class "item"
var recipeDiv = $("<div class='item'>");


$("#addIngrButton").on('click', function() {
    var ingredientInput = $("#ingredients").val().trim();
    var ingredientSpace = $("<p>");
    ingredientSpace.attr("id", "ingredient-" + ingrCount);
    ingredientSpace.append(" " + ingredientInput);

     listOfIngredients.push(ingredientInput);




    var ingrClose = $("<button>");

    ingrClose.attr("data-ingr", ingrCount);
    ingrClose.addClass("deleteBox");
    ingrClose.append("✖︎");

    // Append the button to the to do item
    ingredientSpace = ingredientSpace.prepend(ingrClose);

    // Add the button and ingredient to the div
    $("#listOfIngr").append(ingredientSpace);

    // Clear the textbox when done
    $("#ingredients").val("");

    // Add to the ingredient list
    ingrCount++;

});

$("#ingredients").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#addIngrButton").click();
    }
});

$(document.body).on("click", ".deleteBox", function() {

    // Get the number of the button from its data attribute and hold in a variable .
    var ingrNumber = $(this).attr("data-ingr");

    // Select and Remove the specific <p> element that previously held the to do item number.
    $("#ingredient-" + ingrNumber).remove();

});

var config = {
    apiKey: "AIzaSyB3lbSA5Y4e4StvaYtm5sno0pDad-90NeM",
    authDomain: "groupproject1-fridgetomeal.firebaseapp.com",
    databaseURL: "https://groupproject1-fridgetomeal.firebaseio.com",
    projectId: "groupproject1-fridgetomeal",
    storageBucket: "groupproject1-fridgetomeal.appspot.com",
    messagingSenderId: "32759158700"
};

firebase.initializeApp(config);
var database = firebase.database();
//test branch




//Spoonacular API key I got from mashape is in the header property in the .param object

//This variable captures the users ingredients from input field

$("#submitForRecipes").on('click', function(event) {

    event.preventDefault();

    var userIngredients = "";

    for (var i = 0; i < listOfIngredients.length; i++) {
    userIngredients += listOfIngredients[i];
        if (i != listOfIngredients.length - 1) {
             userIngredients += ",";
        }
    }



    console.log(userIngredients);
    //URL set up using jquery param method and plugging in users ingredients into URL parameters
    var queryURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients';
    queryURL += '?' + $.param({
        // 'fillIngredients': true,
        'ingredients': userIngredients,
        'limitLicense': false,
        'number': 1,
        'ranking': 1,
        // 'ingredientsRequired': true
        'instructionsRequired': false


    }); //fillIngredients=false&ingredients=apples%2Cflour%2Csugar&limitLicense=false&number=5&ranking=1'

    $.ajax({
        url: queryURL,
        headers: { 'X-Mashape-Key': 'xsChWYIjxDmshHomTXHaaWmn7DuTp1ernr7jsnEXl2Nrg8DGIE' },
        method: 'GET'
    }).done(function(response) {
        console.log(response);
        var results = response;
             // Looping over every result item
                for (var i = 0; i < results.length; i++) {
                    console.log(results.length);



                        //store the results here
                        var title = results[i].title;
                        var image = results[i].image;
                        var id = results[i].id
                        // Creating a paragraph tag with recipe title
                        var p = $("<p>").text("title: " + title);

                        // Creating an image tag
                        var image = "<img src=" + image + ">";

                            console.log(image);
                            console.log(id);
                        // append the paragraph and image we created to the "recipeDiv" div we created
                        recipeDiv.append(p);
                        recipeDiv.append(image);

                        // prepend the recipeDiv to the "#recipesGoHere" div in the HTML
                        $("#recipesGoHere").prepend(recipeDiv);

                        getRecipe(id,i);

                }
    })
        function getRecipe(id, recipeNumber) {
              var queryURL2 = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/'+id+'/information';
    queryURL2 += '?' + $.param({


        'includeNutrition': false

    });
        console.log(queryURL2);
             $.ajax({
        url: queryURL2,
        headers: { 'X-Mashape-Key': 'xsChWYIjxDmshHomTXHaaWmn7DuTp1ernr7jsnEXl2Nrg8DGIE' },
        method: 'GET'

    }).done(function(response2) {
        console.log(response2);
        var results = response2;


             var ul = $("<ul id='dropdown1>")//.text("ingredients: ");
               // <!-- Dropdown Trigger -->
 var dropdownList = $("<a>"); // class='dropdown-button btn' href='#' data-activates='dropdown1'>Drop Me!</a>
dropdownList.addClass("dropdown-button btn");
// dropdownList.addClass("btn");
dropdownList.attr('data-activates', "dropdown1");
console.log(dropdownList);
dropdownList.text("ingredients");
             //ul.addId("dropdown"+recipeNumber);
            var ingredientNames = results.extendedIngredients
                 for (var i = 0; i < ingredientNames.length; i++) {

                       var li = "<li>" + "-" + ingredientNames[i].name + "</li>";
                       ul.append(li);
                 }


                 dropdownList.append(ul);

                        // prepend the recipeDiv to the "#recipesGoHere" div in the HTML
                        $(recipeDiv).append(dropdownList);



                });


        }


});





