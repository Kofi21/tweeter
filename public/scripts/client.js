/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  $("form").submit(function (event) {
    event.preventDefault();
    $.ajax("/tweets", {
      method: "POST",
      data: $(this).serialize(),
    });
    console.log(event);
  });

  const loadTweets = function () {
    $.ajax("/tweets", {
      method: "GET",
    }).then(function (tweet) {
      renderTweets(tweet);
    });
  };

  loadTweets();

  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    }
  };

  const createTweetElement = function (tweet) {
    const date = timeago.format(tweet.created_at);
    return ` 
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
    `;
  };
  // Test / driver code (temporary). Eventually will get this from the server.
  // const data = [
  //   {
  //     user: {
  //       name: "Newton",
  //       avatars: "https://i.imgur.com/73hZDYK.png",
  //       handle: "@SirIsaac",
  //     },
  //     content: {
  //       text: "If I have seen further it is by standing on the shoulders of giants",
  //     },
  //     created_at: 1461116232227,
  //   },
  //   {
  //     user: {
  //       name: "Descartes",
  //       avatars: "https://i.imgur.com/nlhLi3I.png",
  //       handle: "@rd",
  //     },
  //     content: {
  //       text: "Je pense , donc je suis",
  //     },
  //     created_at: 1461113959088,
  //   },
  // ];

  // const $tweet = createTweetElement(tweetData);

  renderTweets(data);
});
