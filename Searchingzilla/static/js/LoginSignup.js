const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const signUpForm = document.getElementById("signUpForm");
const signInForm = document.getElementById("signInForm");

const container = document.getElementById("container");

signUpButton.addEventListener("click", () =>
    container.classList.add("right-panel-active")
);

signInButton.addEventListener("click", () =>
    container.classList.remove("right-panel-active")
);

// TODO : Add validaitons for input values.
signUpForm.addEventListener("click", () => {});

// TODO : Add validaitons for input values.
signInForm.addEventListener("click", () => {});
