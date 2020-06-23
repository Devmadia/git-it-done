var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // make a request to the url
    fetch(apiUrl).then(function(response) {
      response.json().then(function(data) {
        console.log(data);
      });
    });
  };

// store references to <form> element with an id of 'user-form'
var userFormEl = document.querySelector("#user-form");
// store reference to the <input> element with an id of 'username'
var nameInputEl = document.querySelector("#username");

// form submission event
var formSubmitHandler = function(event) {
event.preventDefault();
console.log(event);
};

// event listeners
userFormEl.addEventListener("submit", formSubmitHandler);

getUserRepos();