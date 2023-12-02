let clothingTypeList = ["Shirt", "Blouse", "Pants", "Blazer", "Jeans", "Cardigan/Sweater", "Jacket/Coat", "Skirt", "Sweatshirt", "Undergarments", "Lingerie"]
let materialTypeList = ["Acrylic", "Cashmere", "Cotton", "Down", "Elastene", "Genuine Leather", "Linen", "Nylon", "Polyester", "Polyurethane", "Care", "Rayon", "Silk", "Spandex", "Viscose", "Wool"]

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

const form = document.querySelector('form');



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
let createDivMat = [];
let divIdCounter = 1;
if(window.location.href.indexOf("results") > -1){
    //Create condition for empty input
    
    //Non-empty input
    formresults = JSON.parse(localStorage.getItem('form'));
    results = Object.values(formresults);
    console.log(results);

    let clothtype = results[0];
    let materialArr = results[1].split(',');

    let clothtypefile1 = "<object data=fabric-data/clothtype-"
    let clothtypefile2 = ".txt width=100%></object>"
    let clothtypedesc = clothtypefile1 + clothtype + clothtypefile2;

    document.getElementById("clothtype").innerHTML = clothtype + clothtypedesc;
    materialChecker(materialArr)
    
}

function materialChecker(matArr){
    console.log(matArr);

    for(let i=0; i<matArr.length; i++){
        console.log(matArr[i]);
        for(let j=0; j<materialTypeList.length; j++){
            if(matArr[i].includes(materialTypeList[j])){
                console.log("found" + matArr[i]);
                createDivMat.push(materialTypeList[j]);
            }
        }
    }
    console.log(createDivMat);
}

function createRowDiv(fabricname){
    let fabricString = fabricname.toString();
    let thisDiv=document.getElementById("table-container");
    let container=document.createElement("div");
    container.classList.add("results-row");
    container.setAttribute("id", "'" + fabricString + "'");
    thisDiv.appendChild(container);

}

function createColDiv(counter, fabric){
    let container=document.querySelectorAll(".results-row")[counter];
    
    let smallCol=document.createElement("div");
    smallCol.classList.add('results-table-small');
    container.appendChild(smallCol);

    let largeCol=document.createElement("div");
    largeCol.classList.add('results-table-large');
    container.appendChild(largeCol);
    divIdCounter+= 1;
}

function createColDivDesc(counter, fab){
    let thisDiv=document.querySelectorAll('.results-table-large')[counter];
    
    let topic=document.createElement("div");
    topic.classList.add('results-material-title');
    thisDiv.appendChild(topic);
    topic.innerHTML="<b>Fabric:</b> " + fab;

    let topicDesc=document.createElement("div");
    topicDesc.classList.add('results-material-desc');
    thisDiv.appendChild(topicDesc);
    topicDesc.innerHTML = "Fabric description"
    
    let enviro=document.createElement("div");
    enviro.classList.add('results-material-title');
    thisDiv.appendChild(enviro);
    enviro.innerHTML="<b>Environmental Impact:</b> "

    let enviroDesc=document.createElement("div");
    enviroDesc.classList.add('results-material-desc');
    thisDiv.appendChild(enviroDesc);
    enviroDesc.innerHTML = "Environmental Impact"

    let care=document.createElement("div");
    care.classList.add('results-material-title');
    thisDiv.appendChild(care);
    care.innerHTML = "<b>Care:</b>"

    let careDesc=document.createElement("div");
    careDesc.classList.add('results-material-desc');
    thisDiv.appendChild(careDesc);
    careDesc.innerHTML = "Care description"
            
}



let counter=0;
for(i=0; i<createDivMat.length; i++){
    createRowDiv(createDivMat[i])
    createColDiv(counter, createDivMat[i])
    createColDivDesc(counter, createDivMat[i])
    counter+=1;
}
