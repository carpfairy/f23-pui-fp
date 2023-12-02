let clothingTypeList = ["Shirt", "Blouse", "Pants", "Blazer", "Jeans", "Cardigan/Sweater", "Jacket/Coat", "Skirt", "Sweatshirt", "Undergarments", "Lingerie"]

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

if(window.location.href.indexOf("results") > -1){
    //Create condition for empty input

    //Non-empty input
    formresults = JSON.parse(localStorage.getItem('form'));
    results = Object.values(formresults);
    console.log(results);

    let clothtype = results[0];
    let clothtypefile1 = "<object data=fabric-data/clothtype-"
    let clothtypefile2 = ".txt width=100%></object>"
    let clothtypedesc = clothtypefile1 + clothtype + clothtypefile2;

    document.getElementById("clothtype").innerHTML = clothtype + clothtypedesc;
    document.getElementById("")
}