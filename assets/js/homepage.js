// DOM element references
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // make a request to the url
    fetch(apiUrl).then(function(response) {

    // request was successful
    if (response.ok) {
        response.json().then(function(data) {
            displayRepos(data, user);
        });
    } else {
            alert("Error: " + response.statusText);  // notifies user their search has no GitHub user associated with it
    }
    })

    .catch(function(error) {
    // Notice this `.catch()` getting chained onto the end of the `.then()` method
    alert("Unable to connect to GitHub");  
    /* User is notified if the request for pulling repo information fails due to internet outage, GitHub connection
    issue, or any other connection interference. This is so the user doesn't think the page isn't working.*/
    });

};

// fetches featured repos
var getFeaturedRepos = function(language) {
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";
  
    fetch(apiUrl);
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
    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";  // returns a statement if no repos are found for the username entered
        return;
    }
    console.log(repos);
    console.log(searchTerm);

    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;
    
        // create a link for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);
    
        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
                "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
            } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        /* If the number is greater than zero, then we'll display the number 
        of issues and add a red X icon next to it. If there are no issues, 
        we'll display a blue check mark instead. */

        // append to container
        repoEl.appendChild(titleEl);
    
        // append container to the dom
        repoContainerEl.appendChild(repoEl);

        // append to container
        repoEl.appendChild(statusEl);
    }
  
};

// event listeners
userFormEl.addEventListener("submit", formSubmitHandler);

getUserRepos();