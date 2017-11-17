//function checking firebase for ingredient list - if condition
//if no list exists create empty array
var ingrCount = 0

$("#addIngrButton").on('click', function() {
    var ingredientInput = $("#ingredients").val().trim();
    var ingredientSpace = $("<p>");
    ingredientSpace.attr("id", "ingredient-" + ingrCount);
    ingredientSpace.append(" " + ingredientInput);

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
