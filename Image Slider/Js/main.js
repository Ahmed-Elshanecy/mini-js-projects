// Elements
let slideNumber = document.getElementById("slide-number");
let images = document.querySelectorAll("img");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let indicators = document.getElementById("indicators");


let imagesArray = Array.from(images);
let bulletsNumber = imagesArray.length;

// current image index
var index = 1;



// create bullets ul
let bullets = document.createElement("ul");
bullets.setAttribute("id", "ul-id");


// create li and text of bullets ul
for (let i = 1; i <= bulletsNumber; i++) {
    let bulletsLi = document.createElement("li");

    bulletsLi.setAttribute("data-index", i);

    bulletsLi.appendChild(document.createTextNode(i));

    bullets.appendChild(bulletsLi);
}


// append ul to html page
indicators.append(bullets);

// get array of ul li
let newBullets = document.getElementById("ul-id");
let lis = Array.from(newBullets.children);

next.onclick = nextSlide;
prev.onclick = prevSlide;


for (let i = 0; i < lis.length; i++) {

    lis[i].onclick = function () {

        index = parseInt(this.getAttribute('data-index'));

        check();

    };

}

// create check function
check();

function nextSlide() {

    if (next.classList.contains('disabled')) {

        // Do Nothing
        return false;

    } else {

        index++;

        check();

    }

}

function prevSlide() {
    if (prev.classList.contains("disabled")) {
        return false;
    } else {
        index--;
        check();
    }
}

function check() {


    // set slide number
    slideNumber.textContent = "slide #" + (index) + " of " + (bulletsNumber);

    // remove active from classes
    removeActive();

    // images active class
    imagesArray[index - 1].classList.add("active");

    // li active class
    bullets.children[index - 1].classList.add("active");

    if (index === 1) {
        prev.classList.add("disabled");
    } else {
        prev.classList.remove("disabled");
    }

    if (index === imagesArray.length) {
        next.classList.add("disabled");
    } else {
        next.classList.remove("disabled");
    }
}

function removeActive() {

    // from images
    imagesArray.forEach(function (img) {

        img.classList.remove('active');

    });
    // from li 
    lis.forEach(function (bullet) {

        bullet.classList.remove('active');

    });
}