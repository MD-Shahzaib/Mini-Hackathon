import { addStudentToDataBase, studentUploadImage } from "../config/firebase.js"
window.addStudent = async function () {
    const allInputs = document.getElementsByTagName("input");
    const fullName = allInputs[0].value;
    const fatherName = allInputs[1].value;
    const rollNo = allInputs[2].value;
    const contactNo = allInputs[3].value;
    const cnic = allInputs[4].value;
    const course = document.getElementById('course-name').value
    const image = document.getElementById("uploadImage").files[0];
    console.log("additem.js", { fullName, fatherName, rollNo, contactNo, cnic, image, course });
    if (fullName !== '' && fatherName !== '' && rollNo !== '' && contactNo !== '' && cnic !== '' && course !== '' && image !== undefined) {
        try {
            const imageurl = await studentUploadImage(image);
            await addStudentToDataBase(
                { fullName, fatherName, rollNo, contactNo, cnic, course }, imageurl
            );
            Swal.fire({
                icon: 'success',
                title: 'Successfully Add Product',
                showConfirmButton: false,
                timer: 2200
            })
        } catch (e) {
            console.log("error", e.message);
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Fill The Form',
        })
    }
}