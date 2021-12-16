const errorCheck = function (tweetTextValue) {
  const error = $(".error h3");
  const textArea = $(".new-tweet textarea");

  $(textArea).keyup(function () {
    error.html("");
    error.slideUp();
  });

  if (errorCheck(tweetTextValue)) {
    return;
  }

  if (tweetTextValue.length === 0) {
    error.html(
      `<i class="fas fa-exclamation-triangle"></i> Error: Tweet Cannot be Empty `
    );
    textArea.focus();
    error.slideDown();
    return error;
  } else if (tweetTextValue.length > 140) {
    error.html(
      `<i class="fas fa-exclamation-triangle"></i> Error: Exceeded max character limit`
    );
    error.slideDown();
    error.focus();
    return error;
  }
};

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

const loadTweets = function () {
  $.ajax("/tweets", {
    method: "GET",
  }).then(function (tweet) {
    renderTweets(tweet);
  });
};
