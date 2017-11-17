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



//Spoonacular API key I got from mashape

var spoonKey = 'X-Mashape-Key: xsChWYIjxDmshHomTXHaaWmn7DuTp1ernr7jsnEXl2Nrg8DGIE'

var queryURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=apples%2Cflour%2Csugar&limitLicense=false&number=5&ranking=1' + spoonKey;

$.ajax({
    url: queryURL,
    method: 'GET'
}).done(function(response) {

    console.log(response);
})
