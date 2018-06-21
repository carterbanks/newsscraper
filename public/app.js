/* TODO:

  1. Make a reusable function for creating a table body in index.html with the results from your MongoDB query
  Each row should have info for one animal.
  
  *Hint*: We don't want to keep adding to the table with each button click. We only want to show the new results.
  What can we do to the table to accomplish this?

  *Bonus*: Write code to set an 'active' state on the column header. It should make the color sorted-by column red.
  *Bonus*: Add additional ways to sort (e.g. by class or number of legs)
*/
// We'll be rewriting the table's data frequently, so let's make our code more DRY
// by writing a function that takes in data (JSON) and creates a table body
function displayResults(data) {
  // Add to the table here...
  for (i=0; i<data.length; i++){
  
    
  }
}

$.getJSON("/all", function(data) {
  
  displayResults(data);
});
