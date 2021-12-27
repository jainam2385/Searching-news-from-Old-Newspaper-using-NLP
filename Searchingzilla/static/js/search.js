const searchButton = document.getElementById("search-button");
const resultContainer = document.querySelector(".result-container");
const loadMoreButton = document.querySelector(".load-more");
const loader = document.querySelector(".loader");
const noResults = document.querySelector(".no-results-found");

const fetchURL = "http://localhost:8000/search";
let results;
let offset = 0;
let count = 10;

function searchToggle(obj, evt) {
    var container = $(obj).closest(".search-wrapper");
    if (!container.hasClass("active")) {
        container.addClass("active");
        evt.preventDefault();
    } else if (
        container.hasClass("active") &&
        $(obj).closest(".input-holder").length == 0
    ) {
        container.removeClass("active");
        container.find(".search-input").val("");
    }
}

searchButton.addEventListener("click", () => {
    const searchQuery = document.querySelector(".search-input").value;

    if (searchQuery === "") return;

    resultContainer.innerHTML = "";

    console.log("searching...");

    loader.style.display = "block";

    const formData = new FormData();
    formData.append("searchQuery", searchQuery);
    formData.append("csrfmiddlewaretoken", window.csrf_token);

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("search complete.");
            loader.style.display = "none";

            results = JSON.parse(xhr.responseText)["results"];

            if (results.length == 0) {
                noResults.style.display = "block";
            } else {
                displayResult();
            }
        }
    };

    xhr.open("POST", fetchURL);
    xhr.send(formData);
});

const displayResult = () => {
    const end =
        offset + count < results.length ? offset + count : results.length;

    for (let i = offset; i < end; i++) {
        const imageURL = results[i][0];
        const externalImageURL = String(results[i][1]);

        const image = new Image();
        image.src = imageURL;

        image.addEventListener("error", function (event) {
            event.target.src = externalImageURL;
            event.onerror = null;
        });

        resultContainer.append(image);
    }
    offset += count;

    if (offset < results.length) loadMoreButton.style.display = "block";
    else loadMoreButton.style.display = "none";
};

loadMoreButton.addEventListener("click", (event) => {
    event.preventDefault();
    displayResult();
});
