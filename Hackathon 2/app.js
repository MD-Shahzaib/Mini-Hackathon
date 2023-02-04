import { signInFirebase, classDetail, uploadImage, studentInfo, getRealtimeCard } from "./firebase.js"

window.signIn = async function () {
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var p = document.getElementById("para")
    try {
        await signInFirebase(email, password)
        p.innerHTML = ""
        window.location.href = "view/home.html"
    } catch (e) {
        p.innerHTML = e.message
    }
}

window.addClass = async function () {
    var teacher = document.getElementById("teacher")
    var time = document.getElementById("time")
    var schedule = document.getElementById("schedule")
    var section = document.getElementById("section")
    var course = document.getElementById("course")
    var batch = document.getElementById("batch")
    try {
        await classDetail(teacher.value, time.value, schedule.value, section.value, course.value, batch.value)
        alert("Successfully upload")
        teacher.value = ""
        time.value = ""
        schedule.value = ""
        section.value = ""
        course.value = ""
        batch.value = ""
        console.log(class_id.id)
    } catch (e) {
        alert(e.message)
    }
}

window.studentInfo = async function () {
    var name = document.getElementById("name")
    var fname = document.getElementById("fname")
    var roll = document.getElementById("roll")
    var cont = document.getElementById("cont")
    var cnic = document.getElementById("cnic")
    var course = document.getElementById("course")
    var image = document.getElementById("image").files[0]
    try {
        const imageUrl = await uploadImage(image)
        await studentInfo(name.value, fname.value, roll.value, cont.value, cnic.value, course.value, imageUrl)
        alert("Successfully upload")
        name.value = ""
        fname.value = ""
        roll.value = ""
        cont.value = ""
        cnic.value = ""
        course.value = ""
        image.value = ""
    } catch (e) {
        alert(e.message)
    }
}

var input = document.getElementById('roll_id')
input.addEventListener('change', function () {
    const roll_id = document.getElementById("roll_id")
    getRealtimeCard(roll_id, (studentD) => {
        const adsElem = document.getElementById('smit')
        for (let item of studentD) {
            let arr = item.course.split(',')
            adsElem.innerHTML = ` <img src="./image/logo.png" alt="smit">
            </div>
            <div class="card">
                <div class="part1 part">
                    <img src="${item.imageUrl}" alt="">
                    <p>Student Name: <span>${item.name}</span></p>
                    <p>Father Name: <span>${item.fname}</span></p>
                    <p>Roll Number: <span>${item.roll}</span></p>
                    <p>Course: <span>${arr[0]}</span></p>
                </div>
                <div class="part2 part">
                    <p>Teacher's Name: <span>${arr[5]}</span></p>
                    <p>Schedule of classes: <span>${arr[2]}</span></p>
                    <p>Class timings: <span>${arr[1]}</span></p>
                    <p>Section name: <span>${arr[4]}</span></p>
                    <p>Batch Number: <span>${arr[3]}</span></p>
                    <p>CNIC number: <span>${item.cnic}</span></p>
                    <p>Contact Number: <span>${item.cont}</span></p>
                </div>`
        }

    })

});