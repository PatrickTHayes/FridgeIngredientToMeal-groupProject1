# FridgeIngredientToMeal-groupProject1
First Group project

setting up the user interface
    -sticky header displaying the Title displaying

    -Create a 3 column row includes (collapsable panels?)
        -a search ingredient sidebar
        -current ingredient list
        -column that holds potential recipe list

    -Create another row holds video area (collapsable panels?)
        Area is populated when a recipe is selected
    -Some area for messages that can alert user of bad input.
    -Empty Footer (add github/stack/linkedIn Profiles)

On click Submit function - ID 'submit'
    -adds ingredient to current ingredient list
    -submits to ingredient list on firebase
    -user validation call
    -clear input fields when clicked
    -Calls function updateRecipes

Validation Function
    -checks user input for empty
    -AFTER MVP check for words in English
        added bonus check for foreign words

Function updateRecipes
    clear recipe list
    Calls our AJAX call to whichever recipe API we choose
    adds ingredients to api query url
    Populates our recipe list with 9/12 recipes
    Shows 3 recipes at first
    Create a button to show the next page of list of recipes
    each recipe title should have a class called "recipeChoice"

Document onclick function - recipeChoice
    using 'this', call to which recipe is clicked upon
    Takes that title and throws it into our into the next AJAX query url
    Youtube api sends back embed links for top 6 results
    should show two videos at a time with a button to show the next two results
    

  
ID lists