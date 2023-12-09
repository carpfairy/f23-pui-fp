let clothingTypeList = ["Shirt", "Blouse", "Pants", "Blazer", "Jeans", "Cardigan/Sweater", "Jacket/Coat", "Skirt", "Sweatshirt", "Athleisure", "Undergarments", "Lingerie"]

const form = document.querySelector('form');


const materialTypes = {
    "acrylic":{
        "Type":"Synthetic",
        "Grade": "C",
        "Environmental Impact":"C",
        "Care":"Medium"
    },

    "cashmere":{
        "Type":"Natural",
        "Grade": "B",
        "Environmental Impact":"B-",
        "Care":"Hard"
    },

    "cotton":{
        "Type":"Natural",
        "Grade": "A",
        "Environmental Impact":"B",
        "Care":"Easy"
    },

    "down":{
        "Type":"Natural",
        "Grade": "A",
        "Environmental Impact":"A-",
        "Care":"Hard"
    },

    "elastane":{
        "Type":"Synthetic",
        "Grade": "B",
        "Environmental Impact":"D",
        "Care":"Easy"
    },

    "genuine leather":{
        "Type":"Natural",
        "Grade": "B",
        "Environmental Impact":"C",
        "Care":"Medium"
    },

    "linen":{
        "Type":"Natural",
        "Grade": "A",
        "Environmental Impact":"A",
        "Care": "Easy"
    },

    "nylon":{
        "Type":"Synthetic",
        "Grade": "C",
        "Environmental Impact":"C",
        "Care":"Easy"
    },
    
    "polyamide":{
        "Type":"Synthetic",
        "Grade": "C",
        "Environmental Impact":"C",
        "Care": "Easy"
    },

    "polyester":{
        "Type":"Synthetic",
        "Grade": "D",
        "Environmental Impact":"F",
        "Care": "Easy"
    },

    "polyurethane":{
        "Type":"Synthetic",
        "Grade": "D",
        "Environmental Impact":"D",
        "Care": "Hard"
    },

    "rayon":{
        "Type":"Semi-Synthetic",
        "Grade": "B",
        "Environmental Impact":"B-",
        "Care": "Medium"
    },

    "silk":{
        "Type":"Natural",
        "Grade": "A",
        "Environmental Impact":"A-",
        "Care": "Hard"
    },

    "spandex":{
        "Type":"Synthetic",
        "Grade": "C",
        "Environmental Impact":"C",
        "Care":"Easy"
    },

    "viscose":{
        "Type":"Semi-Synthetic",
        "Grade": "B",
        "Environmental Impact":"B-",
        "Care":"Medium"
    },

    "wool":{
        "Type": "Natural",
        "Grade": "A",
        "Environmental Impact":"A-",
        "Care":"Hard"
    },
    
}
let materialObjects = [];
let notFound=[];
let percentages=[];

class Fabric {
    constructor(name, percent, grade, type, enviro, care){
        this.name = name;
        this.grade = grade;
        this.percent = percent;
        this.type = type;
        this.enviro = enviro;
        this.care = care;
    }
}


function clothingTypeDropDown(){
    let cLength = clothingTypeList.length;
    let dropdown = document.querySelector('#clothingDropDown');

        
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

//If on the main homepage, generate the dropdown menu and link the form area
if(window.location.href.indexOf("main") > -1){
    clothingTypeDropDown()

    //Clear localstorage
    // console.log(localStorage.clear());

    //Link submit button to next page
    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        const fd = new FormData(form);
        const obj = Object.fromEntries(fd);
    
        const json = JSON.stringify(obj);
        localStorage.setItem('form', json);
    
        let formStorage = localStorage.getItem('form');
        console.log(Object.keys(formStorage).length);
    
        console.log(localStorage);
        console.log(localStorage.getItem('form'));
    
        window.location.href = "results.html";
        
    });

    //Create typping animation
    let typed= new Typed('.auto-type', {
        strings:["favorite sweater.", "favorite top.", "favorite jacket.", "workout leggings.", "new coat.", "next shopping spree.", "evening gown.", "button down.", "button up.", "wardrobe."],
        typeSpeed:40,
        backSpeed:40,
        looped:true
    })
   
}


if(window.location.href.indexOf("results") > -1){
    let formresults;
    let results;

    //Empty input
    
    //Non-empty input
    formresults = JSON.parse(localStorage.getItem('form'));
    results = Object.values(formresults);
    
    let clothtype = results[0];
    let textarea = results[1];
    
    
    //Add description for what clothing type was selected
    if(!(clothtype == "select")){
        let clothtypeDiv = document.getElementById("clothtype")
        clothtypeDiv.innerHTML = clothtype;

        let clothtypeWrapper = document.getElementById("results-clothtype");
        clothtype = clothtype.split("/");
        clothtype = clothtype[0];
        clothtype = clothtype.toString();

        let clothtypeDescOuter= document.createElement("div");
        clothtypeDescOuter.classList.add("results-clothtype-desc-container");
        clothtypeWrapper.appendChild(clothtypeDescOuter);
        let clothtypeDescInner =document.createElement("div");
        
        clothtypeDescInner.classList.add("results-clothtype-desc");
        clothtypeDescOuter.appendChild(clothtypeDescInner);
        clothtypeDescInner.innerHTML = $(clothtypeDescInner).load("clothing-type/" + clothtype + ".txt");
       
    }

    if(clothtype == "select"){
        let blendingfor = document.getElementById("blending-for");
        blendingfor.remove();
    }

    //Split string by comma
    if(results[1].indexOf(',') > -1){ 
        //Take out all spaces
        textarea = textarea.trim();
         //Make lower case, turn into array of strings             
        textarea = textarea.toLowerCase().split(',');      
    }

    else{
        textarea = results[1].toLowerCase();
        textarea = textarea.trim();
        textarea = textarea.split();
    }
  
    //Get numerical value
    
    for(i in textarea){
        percentages.push(textarea[i]);
    }

    for(i in percentages){
        percentages[i] = percentages[i].replace(/\D/g, "");
    }

    materialChecker(textarea, percentages)
}


//Check if the materials in textarea match with materials in array
function materialChecker(textarea, percentages){
    
    let fabricsList=Object.keys(materialTypes);
    let fabricInput = [];
    
    //If the textarea input is in list of fabric names, put it in the array "fabricInput"
    for(let i=0; i<textarea.length; i++){
        for(j=0; j<fabricsList.length; j++){
            if(textarea[i].includes(fabricsList[j])){
                fabricInput.push(fabricsList[j]);
            }
        }
    }
    
    //If there are no matches between textarea and the list of fabric names, display an error page
    if(fabricInput.length == 0){
        let thisDiv = document.querySelector(".results-clothtype-inter");
        thisDiv.innerHTML = "oops.. we couldn't find that fabric.";
        let clothtype = document.getElementById("clothtype");
        clothtype.remove();
        let newDiv = document.createElement("p");
        thisDiv.appendChild(newDiv);
        newDiv.textContent = "go back and check your spelling!"

        let table = document.querySelector(".results-container");
        let questionImageDiv = document.createElement("div");
        questionImageDiv.classList.add("question-img");
        table.appendChild(questionImageDiv);
        let questionImg = document.createElement('img');
        questionImg.src = "images/question-ascii.png";
        questionImg.alt = "Picture of an ASCII-art style question mark"
        questionImageDiv.appendChild(questionImg);
        



    }
    
    //Take the fabrics from "fabricInput", look for their corresponding details, and make a new object with them
    for(let i=0; i<fabricInput.length; i++){
        let fabricName, fabricPerc, fabricGrade, fabricType, fabricEnviro, fabricCare;
        
        for(let type in materialTypes){
            if(fabricInput[i] == type){
                fabricName = fabricInput[i];
                for(let details in materialTypes[type]){    

                    if(details.includes("Type")){
                        fabricType = materialTypes[type][details];
                    }
                    if(details.includes("Grade")){
                        fabricGrade = materialTypes[type][details];
                    }
                    if(details.includes("Environmental Impact")){
                        fabricEnviro = materialTypes[type][details];
                    }
                    if(details.includes("Care")){
                        fabricCare = materialTypes[type][details];
                    }
                }
            }
        }
        fabricPerc = parseInt(percentages[i]);

        let newFabric = new Fabric(fabricName, fabricPerc, fabricGrade, fabricType, fabricEnviro, fabricCare);
        
        if(newFabric.percent > 100){
            newFabric.percent = 100;
        }

        let duplicate = materialObjects.findIndex(e => e.name === newFabric.name);
        if (duplicate > -1) {
            materialObjects[duplicate].percent += newFabric.percent;
            console.log(materialObjects[duplicate]);
        }   

        else{
            materialObjects.push(newFabric);
        }
    }
    
}

//Create container row for result
function createRowDiv(){
    let thisDiv=document.getElementById("table-container");
    let container=document.createElement("div");
    container.classList.add("results-row");
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
}

function upperCaseName(fabname){
    fabname = fabname.split(" ");
    for(i in fabname){
        fabname[i] = fabname[i].charAt(0).toUpperCase() + fabname[i].substring(1);
    }
    fabname = fabname.join(" ");
    return fabname;
}

//Create inner divs
function createColDivDesc(counter, fab){
    //thatDiv = left image column
    let thatDiv = document.querySelectorAll('.results-table-small')[counter];
    //thisDiv = right text description column
    let thisDiv=document.querySelectorAll('.results-table-large')[counter];
    let name=document.createElement("div");
    name.classList.add('results-material-head');
    thisDiv.appendChild(name);
    
    let fabNameLower = fab.name.replace(/\s+/g, '-').toLowerCase();
    let fabNameUpper = fab.name.charAt(0).toUpperCase() + fab.name.slice(1);
    let fabGrade = fab.grade;
    let fabType = fab.type;
    let fabEnviro = fab.enviro;
    let fabCare = fab.care;

    //Add picture of fabric to thatDiv (left column)
    let clothingImg = document.createElement('img');
    clothingImg.src = "images/" + fabNameLower + "-result.png";
    clothingImg.alt = "Close up picture of " + fabNameLower + " fabric material to show texture";
    thatDiv.appendChild(clothingImg);

    //If name of fab.name is more than one word, turn fab.name into an array to lower case all the first letters
    if (/\s/.test(fab.name)) {
        fabNameUpper = upperCaseName(fab.name);
    }
    
    //If fab.percent is NaN, then don't display it
    if(fab.percent){
        name.innerHTML="<b>" + fabNameUpper + " " + fab.percent + "%</b>";
    }
    else{name.innerHTML="<b>" + fabNameUpper + "</b>";}
    
    //Display grade tag
    let grade=document.createElement("div");
    grade.classList.add('results-grade');
    thisDiv.appendChild(grade);

    grade.innerHTML="Overall grade: " + fabGrade;
    if(fabGrade == "A"){
        grade.style.backgroundColor = "rgb(47, 129, 32)";
    }
    if(fabGrade == "B"){
        grade.style.backgroundColor = "rgb(95, 118, 4)";
    }
    if(fabGrade == "C"){
        grade.style.backgroundColor = "rgb(118, 59, 4)";
    }
    if(fabGrade == "D"){
        grade.style.backgroundColor = "rgb(118, 31, 4)";
    }
    if(fabGrade == "F"){
        grade.style.backgroundColor = "rgb(118, 12, 4)";
    }

    //Create subheads and descriptions
    let type=document.createElement("div");
    type.classList.add('results-material-subhead');
    thisDiv.appendChild(type);
    type.innerHTML="<b>Type:</b> " + fabType;
    
    let typeDesc=document.createElement("div");
    typeDesc.classList.add('results-material-desc');
    thisDiv.appendChild(typeDesc); 
    typeDesc.innerHTML = $(typeDesc).load("fabric-type/" + fabNameLower + ".txt");
        
    let enviro=document.createElement("div");
    enviro.classList.add('results-material-subhead');
    thisDiv.appendChild(enviro);
    enviro.innerHTML="<b>Environmental Impact:</b> " + fabEnviro;
   
   

    let enviroDesc=document.createElement("div");
    enviroDesc.classList.add('results-material-desc');
    thisDiv.appendChild(enviroDesc);
    enviroDesc.innerHTML = $(enviroDesc).load("fabric-enviro/" + fabNameLower + ".txt");

    let care=document.createElement("div");
    care.classList.add('results-material-subhead');
    thisDiv.appendChild(care);
    care.innerHTML = "<b>Care:</b> " + fabCare;

    let careDesc=document.createElement("div");
    careDesc.classList.add('results-material-desc');
    thisDiv.appendChild(careDesc);
    careDesc.innerHTML = $(careDesc).load("fabric-care/" + fabNameLower + ".txt");
        
}

//Add a note if percentages don't add to 100
function percentageChecker(){
    let percentCounter=0;
    for(i in materialObjects){
        percentCounter+= materialObjects[i].percent;
    }
    
    if((percentCounter != 100) && !isNaN(percentCounter) && percentCounter!=0){
        console.log(percentCounter);
        createRowDiv();

        let wrapper=document.querySelectorAll(".results-row");
        wrapper=wrapper[wrapper.length-1];

        let errorDiv = document.createElement("div");
        errorDiv.classList.add("results-percent-error");
        wrapper.appendChild(errorDiv);

        if(percentCounter < 100){
            errorDiv.innerHTML = "Your blend doesn't add to 100%. Did we miss one? <br> Or did you?";
        }
        if(percentCounter > 100){
            errorDiv.innerHTML = "Your blend is more than 100%... what could you possibly be wearing?";
        }
    }
    
}


//Sorting by percentage
materialObjects.sort(({percent:a}, {percent:b}) => b-a);

//Animate logo
// let container = document.querySelector("h1");
// let text = new Blotter.Text("blend", {
//     family: "Inter",
//     size: 60,
//     fill:"#000"
// });

// let material = new Blotter.LiquidDistortMaterial();
// material.uniforms.uSpeed.value=0.1;
// material.uniforms.uVolatility.value=0.15;
// material.uniforms.uSeed.value=0.3;

// let blotter=new Blotter(material, {texts:text});
// let scope=blotter.forText(text);

// scope.appendTo(container);



for(i in materialObjects){
    createRowDiv()
    createColDiv(i)
    createColDivDesc(i, materialObjects[i])
}

percentageChecker()  

//Animate scroll animation for results
if(window.location.href.indexOf("results") > -1){
    ScrollReveal().reveal('.results-flex-container', {delay: 100});
    ScrollReveal().reveal('.results-row', {delay: 500});
}