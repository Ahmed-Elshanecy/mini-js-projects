document.querySelector(".control span").onclick = function () {
    let yourName = prompt("whats your Name");

    if (yourName == "" || null) {
        document.querySelector(".info .name span").innerHTML = "Unknown";

    } else {
        document.querySelector(".info .name span").innerHTML = yourName;

    }
    this.parentElement.remove();
};

// main vars
let duration = 1000;
let blocksContainer = document.querySelector(".photos");
let blocks = Array.from(blocksContainer.children);

let orderArray = [];
let randomNums = [];
let done = 0;

for (let i = 0; i < blocks.length; i++) {
    orderArray.push(i);
}

// to arrange last array's Elements randomly 
for (let i = 0; i < orderArray.length; i++) {
    let random = Math.floor(Math.random() * 20);
    if (randomNums.includes(random)) {
        i--;
    } else {
        randomNums.push(random);
    }
}


blocks.forEach((block, index) => {

    block.style.order = randomNums[index];

    block.addEventListener("click", function () {
        flipBlock(block);
    });
});

function flipBlock(selected) {
    selected.classList.add("is-flipped");

    let allFlipped = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));
    if (allFlipped.length === 2) {
        stopClicking();
        matching(allFlipped[0], allFlipped[1]);
    }
}
function stopClicking() {
    blocksContainer.classList.add("no-clicking");

    setTimeout(() => {
        blocksContainer.classList.remove("no-clicking");
    }, duration);
}

function matching(first, second) {
    let triesElement = document.querySelector(".tries span");

    if (first.dataset.tech === second.dataset.tech) {
        done++;


        first.classList.remove("is-flipped");
        second.classList.remove("is-flipped");

        first.classList.add("has-match");
        second.classList.add("has-match");
        console.log(done);
        if (done === 10) {
            blocksContainer.remove();
        }
    } else {
        triesElement.innerHTML++;
        setTimeout(() => {
            first.classList.remove("is-flipped");
            second.classList.remove("is-flipped");
        }, duration);

    }
}