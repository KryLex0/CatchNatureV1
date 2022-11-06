// Camera stream by using the rear camera

$( document ).ready(function() {
    console.log( "ready!" );
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(function (stream) {
            video.srcObject = stream;
          })
          .catch(function (err0r) {
            console.log("Something went wrong!");
          });
    }
    
    activeLinkFunc();
    clickPhoto();
});


function activeLinkFunc(){
    const list = document.querySelectorAll(".list");
    function activeLink(){
        list.forEach((item) =>
        item.classList.remove("active"));
        this.classList.add("active")
    }
    list.forEach((item)=>
        item.addEventListener("click", activeLink)
    );
}

function getPageMenu(divName){
  let click_button = document.querySelector("#click-photo");

  const list = document.querySelectorAll(".container");
  
  list.forEach((item) =>
    item.style.display = "none");
    
  list.forEach((item) => {
    if(item.classList.contains(divName)){
      if(divName !== "cameraPage"){
        document.getElementById("panel").style.display = "none"
      }else{
        document.getElementById("panel").style.display = "block"
        document.getElementById("click-photo").style.display = "block"
      }

      if (click_button.style.backgroundColor == "white") {
        click_button.style.backgroundColor = "rgb(0, 255, 0)";
        document.getElementById("canvas").style.display = "none";
        document.getElementById("field_name").style.display = "none";
        //document.getElementById("video").style.display = "block";
        document.getElementById("cameraPage").style.display = "none"
      }

      item.style.display = "block";
    }
  });

}


function clickPhoto(){
  const Nom = document.getElementById('Nom');
  const Description = document.getElementById('Description');
  const lien = document.getElementById('lien');

  //const wikilink = document.getElementById("wikilink");
  var link = document.getElementById("wikilink");
  link.setAttribute("href", "https://fr.wikipedia.org/wiki/Tulipe");



  let video = document.querySelector("#video");
  let click_button = document.querySelector("#click-photo");
  let canvas = document.querySelector("#canvas");

  click_button.addEventListener('click', function () {

    // un click sur deux on affiche le panel
    if (click_button.style.backgroundColor == "white") {
       click_button.style.backgroundColor = "rgb(0, 255, 0)";
       document.getElementById("canvas").style.display = "none";
       document.getElementById("field_name").style.display = "none";
       //document.getElementById("video").style.display = "block";
       document.getElementById("cameraPage").style.display = "block"
    } else {
       click_button.style.backgroundColor = "white";
       //document.getElementById("panel").style.display = "block";
       document.getElementById("canvas").style.display = "block";
       document.getElementById("field_name").style.display = "block";
       
       

       // on met en display none la video
       //document.getElementById("video").style.display = "none";
       document.getElementById("cameraPage").style.display = "none"

       canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

       var canvasData = canvas.toDataURL("image/png");

       $.ajax({
          type: "POST",
          url: "./plant_api.php",
          data: {
             imgBase64: canvasData
          }
       }).done(function (data) {
          console.log('saved');
          console.log(data)
/*
          var reponse = JSON.parse(data)
          console.log(reponse);
          var NomData = reponse.suggestions[0].plant_details.common_names[0];
          var DescriptionData = reponse.suggestions[0].plant_details.wiki_description.value;
          var lienWiki = reponse.suggestions[0].plant_details.wiki_description.citation;
          var img1 = reponse.suggestions[0].similar_images[0].url;
          var img2 = reponse.suggestions[0].similar_images[1].url;
*/

          var NomData = "PlanteName";
          var DescriptionData = "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
          var lienWiki = "WikiLink";

          Nom.textContent = NomData;
          // if description is over 720 characters, we cut it and add "..." at the end
          if (DescriptionData.length > 400) {
             DescriptionData = DescriptionData.substring(0, 400) + "...";
          } else {
             DescriptionData = DescriptionData;
          }

          Description.textContent = DescriptionData;

          // we put the image inside the a tag
          lien.innerHTML = '<section class="section__items"><a href="' + lienWiki + '" target="_blank"> <img src="https://jardinage.lemonde.fr/images/dossiers/historique/coquelicot-fleur-184011.jpg" alt="image1" class="image1"> </a></section>';
          lien.innerHTML += '<section class="section__items"><a href="' + lienWiki + '" target="_blank"> <img src="https://jardinage.lemonde.fr/images/dossiers/historique/tournesol-175148.jpg" alt="image2" class="image2"> </a></section>';
          lien.innerHTML += '<section class="section__items"><a href="' + lienWiki + '" target="_blank"> <img src="https://jardinage.lemonde.fr/images/dossiers/2020-03/tulipe-135728.jpg" alt="image2" class="image2"> </a></section>';

       });

    }

    /*              */




 });
}




/*
var video = document.querySelector("#video");


navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false }).then(function (stream) {
    video.srcObject = stream;
 });


console.log(navigator.mediaDevices.getUserMedia());
const checkForVideoAudioAccess = async () => {
    try {
      const cameraResult = await navigator.permissions.query({ name: 'camera' });
      // The state property may be 'denied', 'prompt' and 'granted'
      this.isCameraAccessGranted = cameraResult.state !== 'denied';

      const microphoneResult = await navigator.permissions.query({ name: 'microphone' });
      this.isMicrophoneAccessGranted = microphoneResult.state !== 'denied';
    } catch(e) {
      console.error('An error occurred while checking the site permissions', e);
    }

    return true;
  }


*/