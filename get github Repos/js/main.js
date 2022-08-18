// main variable
let input = document.querySelector(".get-repos input");
let button = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

button.onclick = function () {

    getRepos();
};

function getRepos() {
    if (input.value == "") {

        reposData.innerHTML = "<span> please write Github Username. </span>";

    } else {



        // get github repos
        fetch(`https://api.github.com/users/${input.value}/repos`)
            .then((respone) => respone.json())
            .then((repos) => {
                reposData.innerHTML = "";
                repos.forEach(repo => {

                    let mainDiv = document.createElement("div");

                    let repoName = document.createTextNode(repo.name);

                    mainDiv.appendChild(repoName);

                    // url info
                    let theUrl = document.createElement("a");
                    let repoUrl = document.createTextNode("visit");
                    theUrl.href = `https://github.com/${input.value}/${repo.name}`;
                    theUrl.setAttribute("target", "_blank");
                    theUrl.appendChild(repoUrl);
                    mainDiv.appendChild(theUrl);

                    // create spanStar
                    let stars = document.createElement("span");
                    let starsText = document.createTextNode(`star ${repo.stargazers_count}`);
                    stars.appendChild(starsText);
                    mainDiv.appendChild(stars);


                    // add class to style it in css
                    mainDiv.className = 'repo-box';

                    reposData.appendChild(mainDiv);

                });

            });
    }
}