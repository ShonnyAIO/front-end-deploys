const textarea = document.querySelector("textarea"),
    voiceList = document.querySelector("select"),
    speechBtn = document.querySelector("button");

let synth = speechSynthesis,
    isSpeaking = true;

const voices = () => {
    for (let voice of synth.getVoices()) {
        // Selecciona las voces de  "Google US English" por defecto
        let selected = voice.name === "Google US English" ? "selected" : "";
        // Creando las opciones de los lenguajes disponibles, eso es por navegador
        let option = `<option value='${voice.name}'>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}

voices();

synth.addEventListener("voiceschanged", voices);

const textToSpeech = (text) => {
    let utternance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.cancel();
    for (let voice of synth.getVoices()) {
        if (voice.name === voiceList.value) {
            utternance.voice = voice;
        }
    }
    synth.speak(utternance); // Comienza a Hablar
}


speechBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (textarea.value !== "") {
        if (!synth.speaking) {
            textToSpeech(textarea.value);
        }
        if (textarea.value.length > 80) {
            if (isSpeaking) {
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pausar Speech";
            } else {
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Continuar Speech";
            }
            setInterval(() => {
                if (!synth.speaking && !isSpeaking) {
                    isSpeaking = true;
                    speechBtn.innerText = "Convertir A Audio";
                }
            });
        }
    } else {
        speechBtn.innerText = "Convertir A Audio";
    }
});