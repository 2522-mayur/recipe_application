const app_id="93f0db41"
const app_key="5a758bee0c6b6138687416fc473c0e0e"
const button =document.querySelector("button")
const input=document.querySelector("input")
const loader=document.querySelector("div.loader")
const recipeList=document.querySelector(".cards")
console.log(recipeList)


const loading=(state)=>{
    loader.style=`display: ${state==true? 'block':"none"}`

}
loading(false)


const getRecipe= async (query) => {
    try{
    loading(true)
    const endpoint=`http://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${app_id}&app_key=${app_key}`;
    const response=await fetch(endpoint)
    const {hits}= await response.json()
    console.log(hits)
    if(hits.length===0)window.alert("No recipe found,try something else")

    hits.map(({recipe})=>{
        console.log(recipe)
        const {image,calories,label,url} = recipe
        const ele = document.createElement("li")
        ele.classList.add('cards_item')
       
        ele.innerHTML=`
                <div class="card">
                  <div class="card_image"><img src=${image} alt="mixed vegetable salad in a mason jar. " /></div>
                  <div class="card_content">
                    <h2 class="card_title">${label} <span class="orange">${calories.toFixed(0)}Cal</span></h2>
                    <div class="card_text">
                      <p>
                        
                      </p>
                      
                    </div>
                    <button class="card_btn orange"><a target="_blank" href=${url}>See More +</a></button>
                  </div>
                </div>
                `
        recipeList.appendChild(ele)
    })

    loading(false)
    
    }catch(error){
        loading(false)
        console.log(error);

    }


};

const searchRecipe=()=>{
    recipeList.innerHTML=null
    const query=input.value;
    getRecipe(query)
}

button.addEventListener('click',searchRecipe);
input.addEventListener('keydown',e=>e.key==='Enter'?searchRecipe():null)