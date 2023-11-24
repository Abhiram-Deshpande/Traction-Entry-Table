isGenerated= false;

const generate_extended_table_button = document.getElementById("generate_table")
const table_reference =  document.getElementsByTagName("table")[0]
const patient_name = document.getElementById("patient_name_input").innerText;
const warning_text = document.getElementsByClassName("warning-text")[0];
const program_selector = document.getElementById("program_selector")
let treatment_selector = document.getElementById("treatment_selector")
let program_value = "Traction";
const program_selector_heading = document.getElementById("program_selector_heading")
let pName;
const days=['Sunday',""]

const traction_cols=["Day","Date","Combo","Static","Weight"]
const ift_cols= ["Day","Date","Program","Pole Mode"]
const treatment_array=
['Manual Mode','Myalgia','Cervical','Shoulder 1','Shoulder 1','Torn Muscle','Tonic Muscle',
'Scoliosis','Bursitis','Rheumatoid Arthritis','Arthritis Rheumatic','Tendopathy','Ankle Distortion',
'Reynaud\'s Disease','Post Operative muscle hypotonia','Herpes Zoster','Neuralgia','Ischialgia','Cruciate Ligament Strain',
'Hypertonic trapezius muscle','Capsulitis','Spondylarthritis','Medical Ligament Strain','Calf Muscle Strain','Muscle Strenghtning']

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

program_selector.onchange = ()=>{
    if(program_selector.value==="IFT")
    {
        treatment_selector.style.display="block"
        generateSelectList();
    }
   
}
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
        generateTraction(patient_name);
    }
    else{
        treatment_array.sort();
        
        generateIFT(patient_name);
    }

  
isGenerated = !isGenerated;
}

function generateTraction(patient_name){
    let today = new Date()
    let day=1;
    let currentDate=new Date(today);
    let innerHTMLString ="";
    traction_cols.forEach(col_name => {
        innerHTMLString+=`<th>${col_name}</th>`
    });
    console.log(innerHTMLString)
    table_reference.innerHTML=`<tr><th colspan="${traction_cols.length}">${patient_name}</th></tr><tr>${innerHTMLString}</tr>`
    for(let i=0;i<10;i++){
        let child=document.createElement('tr')
        child.innerHTML=`<tr>
        <td>${day}</td>
        <td>${today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear()}</td>
        <td>
        <input type="number" max="60" min="10" step="10"></input></td>
        <td><input type="number"></td>
        <td></td>
        </tr>`
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
function generateIFT(patient_name){
    let today = new Date()
    let day=1;
    let currentDate=today;
    let innerHTMLString ="";
    let selected_treatment = treatment_selector.value;
    
    ift_cols.forEach(col_name => {    
            innerHTMLString+=`<th>${col_name}</th>`    
    });
    
        table_reference.innerHTML=`<tr><th colspan="${ift_cols.length}">${patient_name}</th></tr><tr>${innerHTMLString}</tr>`

    for(let i=0;i<10;i++){
        let child=document.createElement('tr')
        child.innerHTML=`<tr>
        <td>${day}</td>
        <td>${today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear()}</td>
        <td>${selected_treatment}</td>
        <td></td>
        </tr>`

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

function generateSelectList(){

    let treatementInnerHTML ="";
    treatment_array.sort();
    treatment_array.forEach((treatment,index)=>{
        treatementInnerHTML+=`<option id=${index}>${treatment}</option>`
    })
    treatment_selector.innerHTML=treatementInnerHTML;
}
