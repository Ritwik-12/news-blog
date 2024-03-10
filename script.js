const API_KEY=""
const url=""

//fetch data when the browser window loads 

window.addEventListener("load",()=> fetchdata("india"));

function reload(){
    window.location.reload();
}

async function fetchdata(query)
{
    const response=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data=await response.json();
    //console.log(data)
    bindData(data.articles)
}

function bindData(articles){

    const cardContainer=document.getElementById("card-container")
    const cardArticles=document.querySelector("#template-news-card")
    cardContainer.innerHTML="";

    articles.forEach((article)=>{
        if(!article.urlToImage) return;

        const cardclone=cardArticles.content.cloneNode(true);
        fillDataInCard(cardclone,article)
        cardContainer.appendChild(cardclone);

    });
}

function fillDataInCard(cardclone,article){
     const newsImage=cardclone.querySelector("#news-image");
     const newsTitle=cardclone.querySelector("#news-title")
     const newsSource=cardclone.querySelector("#news-source")
     const newsDesc=cardclone.querySelector("#news-desc")

     newsImage.src=article.urlToImage
     newsTitle.innerHTML=article.title;
     newsDesc.innerHTML=article.description;


     const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
     });
     newsSource.innerHTML=`${article.source.name} . ${date}`;
     
     cardclone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank")
     })
}
 let currentSelectedNav=null;
function navitemClicked(param)
{
    fetchdata(param)
    const navItem=document.getElementById(param);
    currentSelectedNav?.classList.remove("active")
    currentSelectedNav=navItem;
    console.log(currentSelectedNav)
    currentSelectedNav.classList.add("active")
   
}

function searchnews(){
    const inputNews=document.getElementById("input-news");
   
        const searchQuery=inputNews.value
        if(!searchQuery){
            alert("please enter some news topic")
        }
        else{
            fetchdata(searchQuery);
            currentSelectedNav?.classList.remove("active");
            currentSelectedNav=null
        }
        
}
