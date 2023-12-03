let clothingTypeList = ["Shirt", "Blouse", "Pants", "Blazer", "Jeans", "Cardigan/Sweater", "Jacket/Coat", "Skirt", "Sweatshirt", "Undergarments", "Lingerie"]
// let materialTypeList = ["Acrylic", "Cashmere", "Cotton", "Down", "Elastene", "Genuine Leather", "Linen", "Nylon", "Polyester", "Polyurethane", "Care", "Rayon", "Silk", "Spandex", "Viscose", "Wool"]

const form = document.querySelector('form');


const materialTypes = {
    "Acrylic":{
        "Type": "Synthetic",
        "Environmental Impact":"C",
        "Care": "Medium"
    },

    "Cashmere":{
        "Type": "Natural",
        "Environmental Impact":"B-",
        "Care": "Hard"
    },

    "Cotton":{
        "Type": "Natural",
        "Environmental Impact":"B",
        "Care": "Easy"
    },

    "Down":{
        "Type": "Natural",
        "Environmental Impact": "A-",
        "Care": "Hard"
    },

    "Elastane":{
        "Type": "Synthetic",
        "Environmental Impact": "D",
        "Care": "Easy"
    },

    "Genuine Leather":{
        "Type": "Natural",
        "Environmental Impact": "C",
        "Care": "Medium"
    },

    "Linen":{
        "Type": "Natural",
        "Environmental Impact": "A",
        "Care": "Easy"
    },

    "Nylon":{
        "Type": "Synthetic",
        "Environmental Impact": "C",
        "Care": "Easy"
    },

    "Polyester":{
        "Type": "Synthetic",
        "Environmental Impact": "F",
        "Care": "Easy"
    },

    "Polyurethane":{
        "Type": "Synthetic",
        "Environmental Impact": "D",
        "Care": "Hard"
    },

    "Rayon":{
        "Type": "Semi-Synthetic",
        "Environmental Impact": "B-",
        "Care": "Medium"
    },

    "Silk":{
        "Type": "Natural",
        "Environmental Impact": "A-",
        "Care": "Hard"
    },

    "Spandex":{
        "Type": "Synthetic",
        "Environmental Impact": "C",
        "Care": "Easy"
    },

    "Viscose":{
        "Type": "Semi-Synthetic",
        "Environmental Impact": "B-",
        "Care": "Medium"
    },

    "Wool":{
        "Type": "Natural",
        "Environmental Impact": "A-",
        "Care": "Easy"
    },
    
}

let fabricsList = Object.keys(materialTypes);
let materialObjects = [];

class Fabric {
    constructor(name, type, enviro, care){
        this.name = name;
        this.type = type;
        this.enviro = enviro;
        this.care = care;
    }
}


function clothingTypeDropDown(){
    let cLength = clothingTypeList.length;
    let dropdown = document.querySelector('#clothingDropDown')
    for(let i=0; i<cLength; i++){
        let name = clothingTypeList[i];
        let option = document.createElement("option");
        option.textContent = name;
        dropdown.appendChild(option);
    }
}

function getTextArea(){
    let textarea = document.getElementById('#textarea')
    let text = textarea.value;
    console.log(text);

}

function empty() {
    var x;
    x = document.getElementById("textarea").value;
    if (x == "") {
        alert("Enter material type");
        return false;
    };
}


if(window.location.href.indexOf("main") > -1){
    clothingTypeDropDown()

    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        empty()
        const fd = new FormData(form);
        const obj = Object.fromEntries(fd);
    
        //   for(item of fd){
        //     console.log(item);
        //   }
    
        const json = JSON.stringify(obj);
        localStorage.setItem('form', json);
    
        //   if(localStorage.getItem('textarea') != null){
        //     window.location.href="results.html";
        //   }
    
        let formStorage = localStorage.getItem('form');
        console.log(Object.keys(formStorage).length);
    
      console.log(localStorage);
      console.log(localStorage.getItem('form'));
    });
}

let formresults;
let results;
let fabricInput = [];
let divIdCounter = 1;

if(window.location.href.indexOf("results") > -1){
    //Create condition for empty input
    
    //Non-empty input
    formresults = JSON.parse(localStorage.getItem('form'));
    results = Object.values(formresults);
    console.log(results);

    let clothtype = results[0];
    let textarea = results[1].split(',');

    let clothtypefile1 = "<object data=fabric-data/clothtype-"
    let clothtypefile2 = ".txt width=100%></object>"
    let clothtypedesc = clothtypefile1 + clothtype + clothtypefile2;

    document.getElementById("clothtype").innerHTML = clothtype + clothtypedesc;
    materialChecker(textarea)
    
}

//Check if the materials in textarea match with materials in array
function materialChecker(textarea){

    //If the textarea input is in list of fabric names, put it in the array "fabricInput"
    for(let i=0; i<textarea.length; i++){
        for(let j=0; j<fabricsList.length; j++){
            if(textarea[i].includes(fabricsList[j])){
                fabricInput.push(fabricsList[j]);
            }
        }
    }

    //Take the fabrics from "fabricInput", look for their corresponding details, and make a new object with them
    for(let i=0; i<fabricInput.length; i++){
        let fabricType, fabricEnviro, fabricCare;

        for(let fabricName in materialTypes){
            if(fabricInput[i].includes(fabricName)){

                for(let details in materialTypes[fabricName]){
                    
                    if(details.includes("Type")){
                        fabricType = materialTypes[fabricName][details];
                    }
                    if(details.includes("Environmental Impact")){
                        fabricEnviro = materialTypes[fabricName][details];
                    }
                    if(details.includes("Care")){
                        fabricCare = materialTypes[fabricName][details];
                    }
                }

                let newFabric = new Fabric(fabricName, fabricType, fabricEnviro, fabricCare);
                materialObjects.push(newFabric);
            }
        }
    }

}

//Create container row for result
function createRowDiv(){
    // let fabricString = fabricname.name.toString();
    let thisDiv=document.getElementById("table-container");
    let container=document.createElement("div");
    let linebreak=document.createElement("hr");
    thisDiv.appendChild(linebreak);
    container.classList.add("results-row");
    // container.setAttribute("id", "'" + fabricString + "'");
    thisDiv.appendChild(container);

}

//Create two columns inside container row for result
function createColDiv(counter){
    let container=document.querySelectorAll(".results-row")[counter];
    
    let smallCol=document.createElement("div");
    smallCol.classList.add('results-table-small');
    container.appendChild(smallCol);

    let largeCol=document.createElement("div");
    largeCol.classList.add('results-table-large');
    container.appendChild(largeCol);
    divIdCounter+= 1;
}

//Create divs inside description div (right column) for result
function createColDivDesc(counter, fab){
    let thisDiv=document.querySelectorAll('.results-table-large')[counter];
    
    let name=document.createElement("div");
    name.classList.add('results-material-head');
    thisDiv.appendChild(name);
    name.innerHTML="<b>" + fab.name + "</b>"
    
    let type=document.createElement("div");
    type.classList.add('results-material-subhead');
    thisDiv.appendChild(type);
    type.innerHTML="<b>Type:</b> " + fab.type;

    let typeDesc=document.createElement("div");
    typeDesc.classList.add('results-material-desc');
    thisDiv.appendChild(typeDesc); 
    typeDesc.innerHTML = $(typeDesc).load("fabric-type/" + fab.name.toLowerCase() + ".txt");
        
    let enviro=document.createElement("div");
    enviro.classList.add('results-material-subhead');
    thisDiv.appendChild(enviro);
    enviro.innerHTML="<b>Environmental Impact:</b> " + fab.enviro

    let enviroDesc=document.createElement("div");
    enviroDesc.classList.add('results-material-desc');
    thisDiv.appendChild(enviroDesc);
    enviroDesc.innerHTML = $(enviroDesc).load("fabric-enviro/" + fab.name.toLowerCase() + ".txt");

    let care=document.createElement("div");
    care.classList.add('results-material-subhead');
    thisDiv.appendChild(care);
    care.innerHTML = "<b>Care:</b> " + fab.care

    let careDesc=document.createElement("div");
    careDesc.classList.add('results-material-desc');
    thisDiv.appendChild(careDesc);
    careDesc.innerHTML = $(careDesc).load("fabric-care/" + fab.name.toLowerCase() + ".txt")
        
}

//Create image inside image container div (left column) for result
function createColDivPic(counter, fab){
    let thisDiv=document.querySelectorAll('.results-table-small')[counter];
    let img = document.createElement("img");
    img.src = "images/" + fab.name + "-result.png";
    thisDiv.appendChild(img);
}


let counter=0;
for(i=0; i<materialObjects.length; i++){
    createRowDiv()
    createColDiv(counter)
    createColDivDesc(counter, materialObjects[i])
    createColDivPic(counter, materialObjects[i])
    counter+=1;
}
