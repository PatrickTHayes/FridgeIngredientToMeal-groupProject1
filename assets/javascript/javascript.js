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
var userIngredients = $("#ingredients").val().trim();

//URL set up using jquery param method and plugging in users ingredients into URL parameters
var queryURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients';
queryURL += '?' + $.param({
    'fillIngredients': false,
    'ingredients': userIngredients,
    'limitLicense': false,
    'number': 1,
    'ranking': 1

}); //fillIngredients=false&ingredients=apples%2Cflour%2Csugar&limitLicense=false&number=5&ranking=1'

$.ajax({
    url: queryURL,
    headers: { 'X-Mashape-Key': 'xsChWYIjxDmshHomTXHaaWmn7DuTp1ernr7jsnEXl2Nrg8DGIE' },
    method: 'GET'
}).done(function(response) {

    console.log(response);
})
