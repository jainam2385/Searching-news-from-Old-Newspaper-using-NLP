const dropZone = document.querySelector(".drop-zone");
const fileInput = document.querySelector("#fileInput");
const browseBtn = document.querySelector("#browseBtn");
const bgProgress = document.querySelector(".bg-progress");
const progressPercent = document.querySelector("#progressPercent");
const progressContainer = document.querySelector(".progress-container");
const progressBar = document.querySelector(".progress-bar");
const stat = document.querySelector(".status");
const sharingContainer = document.querySelector(".sharing-container");
const copyURLBtn = document.querySelector("#copyURLBtn");
const fileURL = document.querySelector("#fileURL");
const emailForm = document.querySelector("#emailForm");
const toast = document.querySelector(".toast");

const baseURL = "http://localhost:8000";

const uploadURL = `${baseURL}/upload`;

const maxAllowedSize = 100 * 1024 * 1024; //100mb

browseBtn.addEventListener("click", () => {
    fileInput.click();
});

dropZone.addEventListener("drop", (e) => {
    e.preventDefault();

    const files = e.dataTransfer.files;
    if (files.length === 1) {
        if (files[0].size < maxAllowedSize) {
            fileInput.files = files;

            progressContainer.style.display = "none"; // hide the box
            sharingContainer.style.display = "none";

            uploadFile();
        } else {
            showToast("Max file size is 100MB");
        }
    } else if (files.length > 1) {
        showToast("You can't upload multiple files");
    }
    dropZone.classList.remove("dragged");
});

dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("dragged");
});

dropZone.addEventListener("dragleave", (e) => {
    dropZone.classList.remove("dragged");
    console.log("drag ended");
});

// file input change and uploader
fileInput.addEventListener("change", () => {
    if (fileInput.files[0].size > maxAllowedSize) {
        showToast("Max file size is 100MB");
        fileInput.value = ""; // reset the input
        return;
    }

    progressContainer.style.display = "none"; // hide the box

    uploadFile();
});

const uploadFile = () => {
    sharingContainer.style.display = "none";
    stat.innerText = "uploading";
    progressPercent.innerText = 0;

    console.log("file added uploading");
    files = fileInput.files;
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("csrfmiddlewaretoken", window.csrf_token);

    //show the uploader
    progressContainer.style.display = "block";
    // upload file
    const xhr = new XMLHttpRequest();
    // listen for upload progress
    xhr.upload.onprogress = function (event) {
        // find the percentage of uploaded
        let percent = Math.round((100 * event.loaded) / event.total);
        progressPercent.innerText = percent;
        const scaleX = `scaleX(${percent / 100})`;
        bgProgress.style.transform = scaleX;
        progressBar.style.transform = scaleX;
    };
    // handle error
    xhr.upload.onerror = function () {
        showToast(`Error in upload: ${xhr.status}.`);
        fileInput.value = ""; // reset the input
    };
    // listen for response which will give the link
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            onFileUploadSuccess(xhr.responseText);
        }
    };
    xhr.open("POST", uploadURL);
    xhr.send(formData);
};

const onFileUploadSuccess = (res) => {
    fileInput.value = ""; // reset the input
    stat.innerText = "Uploaded";
    progressContainer.style.display = "none"; // hide the box
    sharingContainer.style.display = "block";
};

let toastTimer;

// the toast function
const showToast = (msg) => {
    clearTimeout(toastTimer);
    toast.innerText = msg;
    toast.classList.add("show");
    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
};
