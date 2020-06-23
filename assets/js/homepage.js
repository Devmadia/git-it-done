// DOM element references
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // make a request to the url
    fetch(apiUrl).then(function(response) {
      response.json().then(function(data) {
        displayRepos(data, user);
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
// get value from input element
var username = nameInputEl.value.trim();

if (username) {
  getUserRepos(username);
  nameInputEl.value = "";
} else {
  alert("Please enter a GitHub username");
}
console.log(event);
};

// accept both array of repo data and search term as a parameter
var displayRepos = function(repos, searchTerm) {
    console.log(repos);
    console.log(searchTerm);
    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
};

// event listeners
userFormEl.addEventListener("submit", formSubmitHandler);

getUserRepos();