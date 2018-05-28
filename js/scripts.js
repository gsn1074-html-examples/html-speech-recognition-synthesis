var isRecording;
var final_transcript;
var recognition;

if(!('webkitSpeechRecognition' in window)) {
    
    alert("No support for speech recognition in this browser, sorry.");
    document.getElementById("speech_button").disabled = true;

} else {

    isRecording = false;
    final_transcript = '';
    recognition = new webkitSpeechRecognition();
    recognition.onresult = recognitionOnResult;
    recognition.onend = recognitionOnEnd;
    recognition.continuous = true;
    recognition.lang = "en";
    recognition.interimResults = true;
}

function onPlayClick() {

    var speech = new SpeechSynthesisUtterance(document.getElementById("transcript").value);
    speech.language = "en";
    speech.onend = synthesisOnEnd;
    
    disableUI();

    window.speechSynthesis.speak(speech);
}

function onMicrophoneClick() {

    if(!isRecording) {

        isRecording = true;
        disableUI();
        document.getElementById("speech_button").style.background="red";
        document.getElementById("speech_button").disabled = false;
        document.getElementById("transcript").value = "";
        final_transcript = '';

        recognition.start();

    } else {

        recognition.stop();
    }
}

function recognitionOnResult(event) {

    var interim_transcript = '';

    for(var i = event.resultIndex; i < event.results.length; i++) {

        if(event.results[i].isFinal) {

            final_transcript += event.results[i][0].transcript;
            interim_transcript = final_transcript;
            document.getElementById("transcript").value = final_transcript;

        } else {

            interim_transcript += event.results[i][0].transcript;
            document.getElementById("transcript").value = final_transcript + interim_transcript;

        }
    }
}

function recognitionOnEnd(event) {

    document.getElementById("speech_button").style.background = 'rgb(221, 221, 221)';
    isRecording = false;
    enableUI();
}

function synthesisOnEnd(event) {
    enableUI();
}

function disableUI() {
    document.getElementById("transcript").readOnly = true;
    document.getElementById("speech_button").disabled = true;
    document.getElementById("play_button").disabled = true;
}

function enableUI() {
    document.getElementById("transcript").readOnly = false;
    document.getElementById("speech_button").disabled = false;
    document.getElementById("play_button").disabled = false;
}