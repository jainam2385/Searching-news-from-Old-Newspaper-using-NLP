const loader = document.getElementById("cover-spin");
const approveUrl = "http://localhost:8000/approvePost";
const rejectUrl = "http://localhost:8000/rejectPost";

function acceptPost(post_id) {
    loader.style.display = "block";

    const formData = new FormData();
    formData.append("id", post_id);
    formData.append("csrfmiddlewaretoken", window.csrf_token);

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            document.getElementById(post_id).remove();
            loader.style.display = "none";
        }
    };

    xhr.open("POST", approveUrl);
    xhr.send(formData);
}

function rejectPost(post_id) {
    loader.style.display = "block";

    const formData = new FormData();
    formData.append("id", post_id);
    formData.append("csrfmiddlewaretoken", window.csrf_token);

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            document.getElementById(post_id).remove();
            loader.style.display = "none";
        }
    };

    xhr.open("POST", rejectUrl);
    xhr.send(formData);
}
