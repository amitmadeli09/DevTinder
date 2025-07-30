const validator = require("validator");

const userValidateSignup = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName || !emailId || !password) {
        throw new Error("Please Enter a Name !");
    }

    else if (firstName.length < 3 || firstName.length > 20) {
        throw new Error("First Name must be between 3 to 20 characters");
    }

    else if (lastName.length < 3 || lastName.length > 20) {
        throw new Error("Last Name must be between 3 to 20 characters");
    }

    else if (!validator.isEmail(emailId)) {
        throw new Error("Invalid Email ID");
    }

    else if (!validator.isStrongPassword(password)) {
        throw new Error("Please use a stronger password");
    }
};

module.exports = userValidateSignup;