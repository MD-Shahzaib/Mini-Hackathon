import { options } from "../firebase.js";

async function course() {
    const ads = await options()
    const adsElm = document.getElementById("course")
    for (let item of ads) {
        adsElm.innerHTML += `
        <option value="${item.course},${item.time},${item.schedule},${item.batch},${item.section},${item.teacher}">Course ${item.course} / Time ${item.time} / Schedule ${item.schedule}</option>
        `
    }
}
course();