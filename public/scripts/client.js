$(document).ready(function () {
  const renderTweets = function (tweets) {
    $("#tweets-container").empty();
    for (const tweet of tweets) {
      createTweetElement(tweet);
    }
  };

  const createTweetElement = function (tweet) {
    const date = timeago.format(tweet.created_at);

    let $tweet = $(` 
            <article class="tweet">
          <header class="tweet-header">
          <img src=${tweet.user.avatars} />
            <div class="username">${tweet.user.name}</div>
            <div class="handle">${tweet.user.handle}</div>
          </header>
          <p>${tweet.content.text}</p>
          <footer class="tweet-footer">
            <div>${date}</div>
            <div class="icons">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>
    `);
    $("#tweets-container").prepend($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  };

  const reset = function () {
    const counter = $(".counter");
    const tweetTextBox = $("form").find("#tweet-text");
    counter.html("140");
    tweetTextBox.val("");
  };

  $("form").submit(function (event) {
    event.preventDefault();
    const tweetTextValue = $(this).find("#tweet-text").val().trim();

    if (tweetTextValue === "" || null) {
      alert("Tweet something");
      return;
    }
    if (tweetTextValue.length > 140) {
      alert("Tweets are limited to 140 characters!");
      return;
    }

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $(this).serialize(),
    }).then(function () {
      reset();
      loadTweets();
    });
  });

  const loadTweets = function () {
    $.ajax("/tweets", {
      method: "GET",
      data: "JSON",
    }).then(function (tweet) {
      renderTweets(tweet);
    });
  };

  loadTweets();
});
