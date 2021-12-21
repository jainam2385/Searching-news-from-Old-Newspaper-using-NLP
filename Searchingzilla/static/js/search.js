const searchButton = document.getElementById("search-button");
const resultContainer = document.querySelector(".result-container");
const loader = document.querySelector(".loader");

const fetchURL = "http://localhost:8000/search";

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
            displayResult(xhr.responseText);
        }
    };

    xhr.open("POST", fetchURL);
    xhr.send(formData);
});

const displayResult = (results) => {
    results = JSON.parse(results)["results"];
    for (let i = 0; i < results.length; i++) {
        const imageURL = results[i][0];
        console.log(imageURL);

        const image = new Image();
        image.src = imageURL;

        resultContainer.append(image);
    }

    console.log("complete");
};
