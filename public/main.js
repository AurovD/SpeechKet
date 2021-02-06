let formText = document.forms[0];
let formAudio = document.forms[1];
let text = document.querySelector("textarea");
let message = document.querySelector(".input__msg");
let file = document.querySelector('.input__file');
let fileName = document.querySelector(".input__file-button-text");
let genText = document.querySelector(".text");
const token = 'AQVNzsNXvwiWPAeoSKUTvCpSj8-1sjDbZJZY8jIP';


const toAudio = async (body) => {
    let res = await fetch("api/text", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    let msg = await res.json();
    if(msg.msg === 200) {
        console.log("done")
        let a = document.querySelector(".download");
        let p = document.querySelector(".downloadBox");
        p.style.opacity = "1";
        a.setAttribute("href", './file/voice.ogg');
        message.innerText = "Готово! Нажми скачать";
        setTimeout(() => {
            message.innerText = "от 3 до 300 символов";
        }, 10000);
        text.value = "";
    }
};
const toText = async (body) => {
    let res = await fetch("api/audio", {
        method: "POST",
        headers: {
            'enctype': 'multipart/form-data'
        },
        body: body
    });
    let msg = await res.json();
    if(msg.msg === 200) {
        genText.innerText = `${msg.text}`;
    }

};

formText.addEventListener("submit", e => {
    e.stopPropagation();
    e.preventDefault();
    if(/[а-я]/i.test(text.value)) {
        if(text.value.length >= 3 || text.value.length >= 300){
            let body = {
                text: text.value,
            }
            toAudio(body);
        } else if (text.value.length < 3) {
            message.innerText = "Слишком короткий текст"
        } else if (text.value.length > 300) {
            message.innerText = "Слишком длинный текст"
        }
    } else {
        message.innerText = "Пишите на русском"
    }
})
formAudio.addEventListener("submit", e => {
    e.stopPropagation();
    e.preventDefault();
    const formData = new FormData()
    formData.append('file', file.files[0])
    console.log(formData);
    toText(formData)
})
file.addEventListener('change', function (e) {
    fileName.innerText = file.files[0].name;
});