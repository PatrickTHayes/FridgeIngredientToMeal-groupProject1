var config = {
    apiKey: "AIzaSyDcxYoc_H28Y7yQAGNS1NEueEV_QAcPXW8",
    authDomain: "traintimes-417e7.firebaseapp.com",
    databaseURL: "https://traintimes-417e7.firebaseio.com",
    projectId: "traintimes-417e7",
    storageBucket: "",
    messagingSenderId: "704515675627"
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
