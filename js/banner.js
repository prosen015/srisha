const banners = [
    "images/banners/banner1.jpg",
    "images/banners/banner2.jpg",
    "images/banners/banner3.jpg"
];

let currentBanner = 0;

const bannerImage = document.getElementById("banner-image");

function showBanner(index){

    bannerImage.src = banners[index];

}

function nextBanner(){

    currentBanner++;

    if(currentBanner >= banners.length){

        currentBanner = 0;

    }

    showBanner(currentBanner);

}

function prevBanner(){

    currentBanner--;

    if(currentBanner < 0){

        currentBanner = banners.length - 1;

    }

    showBanner(currentBanner);

}

document.getElementById("next-banner")
.addEventListener("click", nextBanner);

document.getElementById("prev-banner")
.addEventListener("click", prevBanner);

setInterval(nextBanner,4000);