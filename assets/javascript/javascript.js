//function checking firebase for ingredient list - if condition

//if no list exists create empty array
var ingrCount = 0
var listOfIngredients = [];

$("#addIngrButton").on('click', function() {
    var ingredientInput = $("#ingredients").val().trim(); //grab and trim ingrendient text from user, store as var
    var ingredientSpace = $("<p>"); // create p element
    ingredientSpace.attr("id", "ingredient-" + ingrCount); //create dynamic id
    ingredientSpace.append(" " + ingredientInput); //place user input in p element

    //make sure ingredient exists, if so then push it to array
    if (ingredientInput !== '') {
        listOfIngredients.push(ingredientInput);
    }
    //create button element, give it an attr and class, give it an X for the button
    var ingrClose = $("<button>");
    ingrClose.attr("data-ingr", ingrCount);
    ingrClose.addClass("deleteBox");
    ingrClose.append("✖︎");

    if (ingredientInput != '') { // make sure input isn't empty before running
        // Append the button to the to do item
        ingredientSpace = ingredientSpace.prepend(ingrClose);
        // Add the button and ingredient to the div
        $("#listOfIngr").append(ingredientSpace);
        // Clear the textbox when done
        $("#ingredients").val("");
        // Add to the ingredient list
        ingrCount++;
    }
    else { // if empty input display message in ingredient box for a short time
        $("#ingredientsLabel").html('<span style="color:red">"Please input an ingredient!"</span>'); //change color
        setTimeout(function() {
            $("#ingredientsLabel").html("Ingredients"); //return to normal
        }, 2500)
    }
});

//Call add ingredient function if user hits enter
$("#ingredients").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#addIngrButton").click();
    }
});


//Function to delete ingredients when dynamic buttons are clicked
$(document.body).on("click", ".deleteBox", function() {
    // Get the number of the button from its data attribute and hold in a variable .
    var ingrNumber = $(this).attr("data-ingr");
    // Select and Remove the specific <p> element that previously held the to do item number.
    $("#ingredient-" + ingrNumber).remove();
    //delete the item from the array
    listOfIngredients.splice(this, 1);
});


//function to clear ingredient list
$(document.body).on("click", "#clearAllIngredients", function() {
    $("#listOfIngr").html(""); //Clear text field
    listOfIngredients = []; //clear array
});


//Firebase config
var config = {
    apiKey: "AIzaSyB3lbSA5Y4e4StvaYtm5sno0pDad-90NeM",
    authDomain: "groupproject1-fridgetomeal.firebaseapp.com",
    databaseURL: "https://groupproject1-fridgetomeal.firebaseio.com",
    projectId: "groupproject1-fridgetomeal",
    storageBucket: "groupproject1-fridgetomeal.appspot.com",
    messagingSenderId: "32759158700"
};
//initialize Firebase
firebase.initializeApp(config);
var database = firebase.database();
$(function() {
    //Function populates our videosGoHere division when called by click event.
    $(document.body).on("click", ".individualRecipes", function(e) {
        e.preventDefault();
        $("#videosGoHere").html(""); //clear out old carousel videos if present
        var carousel = $("<div class='carousel'>"); //create brand new carousel div element
        $("#videosGoHere").append(carousel); // place in videosGoHere div
        var queryTitle = $(this).attr("data-title"); //hook title of recipe
        //prepare request
        var request = gapi.client.youtube.search.list({ //parameters
            part: "snippet",
            type: "video",
            q: queryTitle,
            maxResults: 5,
            order: "viewCount",
            publishedAfter: "2010-01-01T00:00:00Z"
        })
        //execute request
        request.execute(function(response) {
            //console.log(response);
            setTimeout(function() { //wait short delay before execute request so jQuery finds newly created carousel element
                var results = response.result;
                $.each(results.items, function(index, item) {
                    //$("#videosGoHere").append(item.id.videoId + " " + item.snippet.title + "<br>")
                    var videoId = item.id.videoId;
                    var htmlVideo = "<a class='carousel-item' href='#one!'><div class='video-container'><iframe src='https://www.youtube.com/embed/" + videoId + "' width='560' height='315' frameborder='0' allowfullscreen></iframe></div></a>";
                    $(".carousel").append(htmlVideo);
                    //$(".carousel2").append(htmlVideo);
                })
            }, 50)
            //initialize carousel and give parameters
            $(document).ready(function() {
                setTimeout(function() { carouselInit() }, 1750) //wait before running carouselinit, allows videos to load and brings carousel up smoothly
            });
        })
    })
})

//Initialize carousel
function carouselInit() {
    $('.carousel').carousel({
        //height: 500,
        padding: 100,
        shift: 50,
        dist: -100,
        //indicators: true, //uncomment if you want indicators, although you will have to stylize them to show.
    });
}

//Initialize youtube API
function init() {
    gapi.client.setApiKey("AIzaSyCrDLUDgfk0UO5izg05bh7tU1dIjbBmBA8");
    gapi.client.load("youtube", "v3", function() {
        //yt api is ready
    })
}

//ingredients to Recipe function.. on click.. spoonacular apis are called
$("#submitForRecipes").on('click', function(event) {
    event.preventDefault(); //dont reload page
    var userIngredients = ""; //create string var
    if (listOfIngredients.length === 0) { //if our ingredient list is empty, ask user to put some in
        $("#ingredientsLabel").html("<span style='color:red'>'Recipes require Ingredients!!!</span>");
        setTimeout(function() {
            $("#ingredientsLabel").html("Ingredients"); //return to normal after 2.5 seconds
        }, 2500)
    }
    //build string variable by going through array of ingredients
    for (var i = 0; i < listOfIngredients.length; i++) {
        userIngredients += listOfIngredients[i];
        if (i != listOfIngredients.length - 1) {
            userIngredients += ",";
        }
    }


    //URL set up using jquery param method and plugging in users ingredients into URL parameters
    var queryURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients';
    queryURL += '?' + $.param({
        // 'fillIngredients': true,
        'ingredients': userIngredients,
        'limitLicense': false,
        'number': 6,
        'ranking': 1,
        // 'ingredientsRequired': true
        'instructionsRequired': false


    }); //fillIngredients=false&ingredients=apples%2Cflour%2Csugar&limitLicense=false&number=5&ranking=1'
    //Ajax call after our query has been set up
    $.ajax({
        url: queryURL,
        headers: { 'X-Mashape-Key': 'xsChWYIjxDmshHomTXHaaWmn7DuTp1ernr7jsnEXl2Nrg8DGIE' },
        method: 'GET'
    }).done(function(response) {
        $("#recipesGoHere").html(""); //clear out recipes div when called in case of old recipes
        var results = response;
        // Looping over every result item
        for (var i = 0; i < results.length; i++) {


            var recipeDiv = $("<div class='item'>"); //create a var with div element and a class
            var id = results[i].id //get id and store as a variable
            getRecipe(id, i, recipeDiv); //call the getRecipe function, pass the id, div, and what number of the array were on.
            var title = results[i].title; //store the results here
            title = "how to make " + title; //add how to make to recipe title to bring up more relevant results
            var image = results[i].image; //grab image from ajax call

            //Validation logic of title
            var findHashtag = title.search("#"); //find if title has a hashtag.
            //Hashtags usually have multiple words strung together without spaces, bringing search results to 0.
            //if a title does have a hashtag, we dont want to display that title.
            if (findHashtag !== -1) {
                continue; // if hash tag exists we dont want  to execute rest of code, skip this iteration of loop
            }
            var uriTitle = title.replace(/\(.+?\)/g, ''); //replace parentheses with +
            uriTitle = uriTitle.replace(/[^a-z0-9+]+/gi, ' '); //replace all non  a-z 0-9 with a space
            uriTitle = encodeURIComponent(uriTitle).replace(/%20/g, '+'); //encode to uri and change encoded spaces to +

            // Creating a paragraph tag with recipe title and attr
            var p = $("<p class='individualRecipes'>").text("title: " + title);
            p.attr("data-title", uriTitle);

            // Creating an image tag
            image = "<img src=" + image + " class='individualRecipes' data-title=" + uriTitle + ">";
            // append the paragraph and image we created to the "recipeDiv" div we created
            recipeDiv.append(p);
            recipeDiv.append(image);

            // prepend the recipeDiv to the "#recipesGoHere" div in the HTML
            $("#recipesGoHere").prepend(recipeDiv);

            // when you hover over the image it changes opacity
            $('img').hover(function() {

                $(this).css('opacity', 0.5);
                $(this).text("test");
            }, function() {
                $(this).css('opacity', 1);
            });
        }
    })
    //get recipe function, different ajax spoonacular call
    function getRecipe(id, recipeNumber, recipeDiv) {
        //place recipe id in query url
        var queryURL2 = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + id + '/information';
        //set rest of params
        queryURL2 += '?' + $.param({
            'includeNutrition': false
        });
        //ajax call
        $.ajax({
            url: queryURL2,
            headers: { 'X-Mashape-Key': 'xsChWYIjxDmshHomTXHaaWmn7DuTp1ernr7jsnEXl2Nrg8DGIE' },
            method: 'GET'

        }).done(function(response2) {
            //store results
            var results = response2;
            //create ul element with a class and dynamic id
            var ul = $("<ul class='dropdown-content' id='dropdown" + recipeNumber + "'>") //.text("ingredients: ");
            // <!-- Dropdown Trigger -->
            var dropdownList = $("<a>"); // class='dropdown-button btn' href='#' data-activates='dropdown1'>Drop Me!</a>
            dropdownList.addClass("dropdown-button btn");
            // dropdownList.addClass("btn");
            dropdownList.attr('data-activates', "dropdown" + recipeNumber);
            dropdownList.text("ingredients");
            //ul.addId("dropdown"+recipeNumber);
            var ingredientNames = results.extendedIngredients
            //loop through and create list items of ingrendients for this recipe
            for (var i = 0; i < ingredientNames.length; i++) {
                var li = "<li>" + "-" + ingredientNames[i].name + "</li>";
                ul.append(li);
            }
            // append our ul var
            dropdownList.append(ul);

            // prepend the recipeDiv to the "#recipesGoHere" div in the HTML
            $(recipeDiv).append(dropdownList);
            $('.dropdown-button').dropdown({
                inDuration: 300,
                outDuration: 225,
                constrainWidth: false, // Does not change width of dropdown to that of the activator
                hover: true, // Activate on hover
                gutter: 0, // Spacing from edge
                belowOrigin: true, // Displays dropdown below the button
                alignment: 'left', // Displays dropdown with edge aligned to the left of button
                stopPropagation: false // Stops event propagation
            });
        });
    }
});
