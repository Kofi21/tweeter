$(document).ready(function () {
  console.log("Working");
});

$("#tweet-text").on("input", function () {
  //declaring variable we will keep count of text box characters with

  let currentCount = 140;

  //traverse up the DOM tree and find the node with class of counter
  const counter = $(this).closest(".new-tweet").find(".counter");

  //obtaining value of "this" (#tweet-text)
  let value = $(this).val();

  //keeping count of number of characters in the textbox
  currentCount -= value.length;

  //changing value of counter to currentCount variable value
  $(counter).val(currentCount);

  // if value is less than 0, add class of red which has CSS properties in new-tweet.css
  if (currentCount < 0) {
    counter.addClass("red");
  }

  // if value is less than 0, remove class of red which has CSS properties in new-tweet.css
  if (currentCount >= 0) {
    counter.removeClass("red");
  }
});
