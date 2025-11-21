document.getElementById("signupForm").addEventListener("submit", function (e) {
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("errorMsg");
    let errors = [];


    if (password.length < 8 || password.length >= 15) {
        errors.push("Length must be at least 8 characters and less than 15 characters");
    }

    if (!/^[A-Z]/.test(password)) {
        errors.push("Should start with an uppercase alphabet character");
    }

    if (!/[A-Z]/.test(password)) {
        errors.push("Includes at least one uppercase alphabet character");
    }

    if ((password.match(/[a-z]/g) || []).length < 2) {
        errors.push("Includes at least two lowercase alphabet characters");
    }

    if (!/[0-9]/.test(password)) {
        errors.push("Includes at least one numeric value");
    }

    if (!/_/.test(password)) {
        errors.push('Should include the character "_"');
    }

    if (errors.length > 0) {
        e.preventDefault();
        errorMsg.innerText = "The password is not valid - " + errors.join(", ");
    } else {
        errorMsg.innerText = "";
    }
});
