const router = require("express").Router()
const { body } = require("express-validator")
const { createUser, siginUser } = require("../controllers/auth")

router.post(
    "/signup",
    body("email").isEmail().withMessage("Invalid Email"),
    body("firstname")
        .isAlpha()
        .withMessage("First name must contain only alphabetical chars")
        .isLength({ min: 3 })
        .withMessage("First name must be at least 3 chars long"),
    body("lastname")
        .isAlpha()
        .withMessage("First name must contain only alphabetical chars")
        .isLength({ min: 3 })
        .withMessage("First name must be at least 3 chars long"),
    body("password")
        .isLength({ min: 10 })
        .withMessage(
            "Password must contain 10 chacracters which includes combination Uppercase, Lowercase, Numbers and " +
            "atleast one special Character '@#$*&'"
        )
        .matches(/[@$#*&]/)
        .withMessage(
            "Password must contain 10 chacracters which includes combination Uppercase, Lowercase, Numbers and " +
            "atleast one special Character '@#$*&'"
        )
        .matches(/[0-9]/)
        .withMessage(
            "Password must contain 10 chacracters which includes combination Uppercase, Lowercase, Numbers and " +
            "atleast one special Character '@#$*&'"
        )
        .matches(/[a-z]/)
        .withMessage(
            "Password must contain 10 chacracters which includes combination Uppercase, Lowercase, Numbers and " +
            "atleast one special Character '@#$*&'"
        )
        .matches(/[A-Z]/)
        .withMessage(
            "Password must contain 10 chacracters which includes combination Uppercase, Lowercase, Numbers and " +
            "atleast one special Character '@#$*&'"
        ),
    body("username")
        .isLength({ min: 3, max: 10 })
        .withMessage(
            "Username must be min 3 characters long and max 10 characters long"
        ),
    createUser
)

router.post(
    "/signin",
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
        .isLength({ min: 10 })
        .withMessage("Password must be at least 10 chars long")
        .matches(/[@$#*&]/)
        .withMessage(
            "Password must contain atleast one special character as '@#$*&'"
        )
        .matches(/[0-9]/)
        .withMessage("Password must contain numbers")
        .matches(/[a-z]/)
        .withMessage("Password must contain characters")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase character"),
    siginUser
)

module.exports = router
