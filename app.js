isGenerated= false;

const generate_extended_table_button = document.getElementById("generate_table")
const table_reference =  document.getElementsByTagName("table")[0]
const patient_name = document.getElementById("patient_name_input").innerText;
const warning_text = document.getElementsByClassName("warning-text")[0];
const program_selector = document.getElementById("program_selector")
let program_value = "Traction";
const program_selector_heading = document.getElementById("program_selector_heading")
let pName;
const days=['Sunday',""]

generate_extended_table_button.addEventListener("click",()=>{
    
    var win = window.open('', '', 'height=700,width=700');
    win.document.write('<html><head>');

    win.document.write(`<title>Profile</title>
    <link rel="stylesheet" href="aux_style.css">`); // < title > FOR PDF HEADER.


    win.document.write('</head>');

    win.document.write('<body><main>');

    console.log(table_reference);
    win.document.write(`<table>${table_reference.innerHTML}</table>`); // THE TABLE CONTENTS INSIDE THE BODY TAG.

    win.document.write('</main></body></html>');
    
})

let form = document.getElementById("name-date-form")

form.addEventListener('submit',(event)=>{
    event.preventDefault()
    pName =  document.getElementById("patient_name_input").value
    if(pName.length !=0)
    {
        if(!isGenerated){
            generateExtendedTable(pName);
            
            warning_text.style.display="none"
        }
        else{
            warning_text.innerText='Please refresh to create new entry'
            warning_text.style.display="block"
        }
        
    }
    else{
         warning_text.style.display="block"
        console.log("Length cannot be zero")
    }
    
})

function generateExtendedTable(patient_name){
    document.getElementById("set_patient_name").innerText =patient_name

    let program_value = document.getElementById("program_selector").value;

    if(program_value==="Traction"){
        generateTraction();
    }
    else{
        generateIFT();
    }

  
isGenerated = !isGenerated;
}

function generateTraction(){
    let today = new Date()
    let day=1;
    let currentDate=today;
    program_value=program_selector.value;

    for(let i=0;i<10;i++){
        let child=document.createElement('tr')
        child.innerHTML=`<tr><td>${day}</td><td>${today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear()}</td><td>Combo</td><td>${program_value}</td><td>Static</td><td>Weight</td></tr>`
        table_reference.appendChild(child)
        today = new Date()
        console.log(currentDate.getDay())
        if(currentDate.getDay()==0){
        today.setDate(currentDate.getDate()+2);
        }
        else{
            today.setDate(currentDate.getDate()+1);
        }
        
        currentDate = today;
        day++;
    
}
}
function generateIFT(){
    let today = new Date()
    let day=1;
    let currentDate=today;
    program_value=program_selector.value;
    program_selector_heading.innerHTML=`Program`

    for(let i=0;i<10;i++){
        let child=document.createElement('tr')
        child.innerHTML=`<tr><td>${day}</td><td>${today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear()}</td><td>Unkonwn Field</td><td>${program_value}</td><td></td></tr>`
        table_reference.appendChild(child)
        today = new Date()
        console.log(currentDate.getDay())
        if(currentDate.getDay()==0){
        today.setDate(currentDate.getDate()+2);
        }
        else{
            today.setDate(currentDate.getDate()+1);
        }
        
        currentDate = today;
        day++;
    
}
}
