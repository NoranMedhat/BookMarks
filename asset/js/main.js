// ? Html Elemnts
var siteNameEl =document.getElementById("siteName");
var siteUrlEl=document.getElementById("siteUrl");
var submitBtn= document.getElementById("submit");
var tableEl=document.getElementById("table");
var modalEl =document.getElementById("modal");
var closeBtn=document.getElementById("close")

// ? App Varibles
var allSites=[];
if(JSON.parse(localStorage.getItem("allSites")) !=null){
    allSites = JSON.parse(localStorage.getItem("allSites"));
    displayAllSites();

}
// ? Functions 
function addsite(){
    var siteNameValue = siteNameEl.value;
    var siteUrlValue = siteUrlEl.value;

    if (!isValidUrl(siteUrlValue)) {
        openModal();
        return;
    }
    var site={
        siteNameValue:siteNameEl.value,
        siteUrlValue:siteUrlEl.value
    }
    
    allSites.push(site);
    localStorage.setItem("allSites",JSON.stringify(allSites));

    clear()
    displayAllSites()
    
console.log(allSites);
}
function clear(){
    siteNameEl.value=""
    siteUrlEl.value=""

}
function displayAllSites(){
    var box="";
    for(var i=0 ;i<allSites.length;i++)
    {
        box+=
        `
        <tr>
        <td>${i+1}</td>
        <td>${allSites[i].siteNameValue}</td>
        <td><a href='${allSites[i].siteUrlValue}' class="text-decoration-none text-success">${allSites[i].siteNameValue}</a> </td>
        <td><button onclick="deletSites(${i})" class="btn-outline-danger btn"> Delete</button></td>
        </tr>
        `
        console.log("boxes ");

    }
    tableEl.innerHTML=box;
}
function deletSites(index){
allSites.splice(index,1)
localStorage.setItem("allSites",JSON.stringify(allSites));

displayAllSites()
console.log(allSites);
}
function isValidUrl(url) {
    var urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
    return urlRegex.test(url);
}
function openModal(){
    modalEl.style.display='block';

}

function closeModal() {
    modalEl.style.display = 'none';
}
// ? Events
submitBtn.onclick=addsite;
closeBtn.onclick=closeModal;
    window.onclick = function(event) {
        if (event.target == modalEl) {
        modalEl.style.display = "none";
        }
    }