//function checking firebase for ingredient list - if condition
//if no list exists create empty array
var ingrCount = 0
var listOfIngredients = [];
// Creating a div with the class "item"


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
$(function() { //Function populates our videosGoHere division when called by click event.
    //Replace indicator when we know which click event should trigger our function
    $(document.body).on("click", ".individualRecipes", function(e) {
        e.preventDefault();
        $("#videosGoHere").html(""); //clear out old carousel videos if present
        var carousel = $("<div class='carousel'>"); //create brand new carousel div element
        $("#videosGoHere").append(carousel); // place in videosGoHere div
        console.log("On click recipe has fired");
        var queryTitle = $(this).attr("data-title"); //hook title of recipe
        //prepare request
        var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            //change the hook here to whatever are ingredients
            q: queryTitle, //encodeURIComponent(queryTitle), //I'm not sure if this is needed at the end. Testing shows it works with spaces without it added//.replace(/%20/g, "+"),
            maxResults: 5,
            order: "viewCount",
            publishedAfter: "2015-01-01T00:00:00Z"
        })
        //execute request
        request.execute(function(response) {
            //console.log(response);
            setTimeout(function() { //wait before execute request so jQuery finds newly created carousel element
                var results = response.result;
                $.each(results.items, function(index, item) {
                    console.log(item)
                    //$("#videosGoHere").append(item.id.videoId + " " + item.snippet.title + "<br>")
                    var videoId = item.id.videoId;
                    var htmlVideo = "<a class='carousel-item' href='#one!'><div class='video-container'><iframe src='https://www.youtube.com/embed/" + videoId + "' width='560' height='315' frameborder='0' allowfullscreen></iframe></div></a>";
                    $(".carousel").append(htmlVideo);
                    console.log(htmlVideo)
                    //$(".carousel2").append(htmlVideo);
                })
            }, 50)


            //initialize carousel and give parameters
            $(document).ready(function() {
                setTimeout(function() { carouselInit() }, 3000) //wait 3 seconds before running carouselinit
            });
        })
    })
})

function carouselInit() {
    $('.carousel').carousel({
        //height: 500,
        padding: 100,
        shift: 50,
        dist: -100,

        indicators: true,
    });
}


function init() {
    gapi.client.setApiKey("AIzaSyCrDLUDgfk0UO5izg05bh7tU1dIjbBmBA8");
    gapi.client.load("youtube", "v3", function() {
        //yt api is ready
    })
}

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
        'number': 2,
        'ranking': 1,
        // 'ingredientsRequired': true
        'instructionsRequired': false


    }); //fillIngredients=false&ingredients=apples%2Cflour%2Csugar&limitLicense=false&number=5&ranking=1'

    $.ajax({
        url: queryURL,
        headers: { 'X-Mashape-Key': 'xsChWYIjxDmshHomTXHaaWmn7DuTp1ernr7jsnEXl2Nrg8DGIE' },
        method: 'GET'
    }).done(function(response) {
        $("#recipesGoHere").html(""); //clear out recipes div when called
        //console.log(response);
        var results = response;
        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

            console.log(results.length);

            var recipeDiv = $("<div class='item'>");
            var id = results[i].id
            getRecipe(id, i, recipeDiv);
            //store the results here
            var title = results[i].title;
            title = "how to make " + title; //add how to make to recipe title to bring up more relevant results
            var image = results[i].image;
            var uriTitle = encodeURIComponent(title).replace(/%20/g, '+');
            console.log(uriTitle);
            /*var singleRecipeDiv = $('<div class="individualRecipes">');
            singleRecipeDiv.attr('data-title', results[i].title);*/

            // Creating a paragraph tag with recipe title
            var p = $("<p class='individualRecipes'>").text("title: " + title);
            p.attr("data-title", uriTitle);

            // Creating an image tag
            image = "<img src=" + image + " class='individualRecipes' data-title=" + uriTitle + ">";
            //image.attr("data-title", title);


            console.log(image);
            console.log(id);
            // append the paragraph and image we created to the "recipeDiv" div we created
            recipeDiv.append(p);
            recipeDiv.append(image);

            // prepend the recipeDiv to the "#recipesGoHere" div in the HTML
            $("#recipesGoHere").prepend(recipeDiv);



        }
    })

    function getRecipe(id, recipeNumber, recipeDiv) {
        console.log(id)
        var queryURL2 = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + id + '/information';
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


            var ul = $("<ul class='dropdown-content' id='dropdown" + recipeNumber + "'>") //.text("ingredients: ");
            // <!-- Dropdown Trigger -->
            var dropdownList = $("<a>"); // class='dropdown-button btn' href='#' data-activates='dropdown1'>Drop Me!</a>
            dropdownList.addClass("dropdown-button btn");
            // dropdownList.addClass("btn");
            dropdownList.attr('data-activates', "dropdown" + recipeNumber);
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
            $('.dropdown-button').dropdown({
                inDuration: 300,
                outDuration: 225,
                constrainWidth: false, // Does not change width of dropdown to that of the activator
                hover: false, // Activate on hover
                gutter: 0, // Spacing from edge
                belowOrigin: false, // Displays dropdown below the button
                alignment: 'left', // Displays dropdown with edge aligned to the left of button
                stopPropagation: false // Stops event propagation
            });


        });


    }


});
