//https://teachablemachine.withgoogle.com/models/tylliczWH/
var prediction1 = "";
var prediction2 = "";
Webcam.set({
    width: 350,
    height: 300, 
    image_format: 'png',
    png_quality: 90
})
var camera = document.getElementById("camera");
Webcam.attach(camera);
function take_snapshot(){
Webcam.snap(function(data_uri){
    document.getElementById("camera").innerHTML = '<img src= "'+data_uri+'" id= "capture_image2">'
})}
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/tylliczWH/model.json", modelLoaded);
function modelLoaded(){
    console.log("Model has been successfully loaded");
}
function speak(){
    synth = window.speechSynthesis;
    speak_data_1 = 'First prediction is '+ prediction1;
    speak_data_2 = 'Second prediction is '+ prediction2;
    //Speechsynthesis utterance helps the speaker speak out the things like the emotions and emojis for predictions 1 and 2.
    utterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    //synth.speak(utterThis) stands for synthesis.speak(utterThis)
    synth.speak(utterThis);
}
function check(){
    img = document.getElementById("capture_image2");
    classifier.classify(img, gotResults);
}
function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("handgesture").innerHTML = results[0].label;
        document.getElementById("handgesture2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if(results[0].label == "Love"){
            document.getElementById("updatehandgesture").innerHTML = "&#129782";
        }
        if(results[0].label == "Ok sign"){
            document.getElementById("updatehandgesture").innerHTML = "&#128076";
        }
        if(results[0].label == "peace"){
            document.getElementById("updatehandgesture").innerHTML = "&#9996";
        }
        if(results[0].label == "Agree"){
            document.getElementById("updatehandgesture").innerHTML = "&#128077";
        }
        if(results[0].label == "Disagree"){
            document.getElementById("updatehandgesture").innerHTML = "&#128078";
        }
        if(results[1].label == "Love"){
            document.getElementById("updatehandgesture2").innerHTML = "&#129782";
        }
        if(results[1].label == "Ok sign"){
            document.getElementById("updatehandgesture2").innerHTML = "&#128076";
        }
        if(results[1].label == "Peace"){
            document.getElementById("updatehandgesture2").innerHTML = "&#9996";
        }
        if(results[1].label == "Agree"){
            document.getElementById("updatehandgesture2").innerHTML = "&#128077";
        }
        if(results[1].label == "Disagree"){
            document.getElementById("updatehandgesture2").innerHTML = "&#128078";
        }
    }
}