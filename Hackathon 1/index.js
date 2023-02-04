import { signInFirebase } from "./config/firebase.js";

//function to login
window.login = async function () {
    const allInputs = document.getElementsByTagName("input");
    const email = allInputs[0].value;
    const password = allInputs[1].value;
    console.log("information", email, password);

    if (email !== "" && password !== "") {
        try {
            await signInFirebase(email, password);
            await Swal.fire({
                icon: "success",
                title: "Successfully LoggIn",
                showConfirmButton: false,
                timer: 1500,
            });
            alert("logIn Successfully");
            location.href = "../../index.html";
        } catch (e) {
            switch (e.message) {
                case "Firebase: Error (auth/invalid-email).":
                    Swal.fire({
                        icon: "error",
                        title: "Invalid Email",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    break;
                case "Firebase: Error (auth/wrong-password).":
                    Swal.fire({
                        icon: "error",
                        title: "Invalid password",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    break;
                case "Firebase: Error (auth/user-not-found).":
                    Swal.fire({
                        icon: "error",
                        title: "User Not Found",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    break;
                default:
                    Swal.fire({
                        icon: "error",
                        title: "Unknown Error Occured",
                        showConfirmButton: false,
                        timer: 1500,
                    });
            }
        }
    }
    else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Fill The Form",
        });
    }
};
