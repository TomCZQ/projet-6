let worksData = [];
let workDataArray="";
let storedWorksData ="";
let worksCategories=[];
let worksName= [];
let filterCategory="";
let tousFilter = document.getElementById("tous");
let objetsFilter = document.getElementById("objets");
let appartementsFilter = document.getElementById("appartements");
let hotelsRestaurantsFilter = document.getElementById("hotelsrestaurants");
let gallery = document.querySelector(".gallery");


async function fetchWorks() {
        try {
            let works = await fetch ('http://localhost:5678/api/works')       
            worksData =  await works.json()
            workDataArray = JSON.stringify(worksData)
            return worksData;         
        }
        catch (error) {
            console.error("Erreur lors du chargement", error);
        }     
}


async function worksFilter(filterCategory){
    await fetchWorks();
    let filteredWorks= worksData;        
    if (filterCategory) {
        filteredWorks = worksData.filter(work => {
            return work.category.name === filterCategory;
        });           
    }
    return filteredWorks;    
}

async function affichageTravaux(filteredWorks){    
    let figureHtml="";  
    for(let i=0; i<filteredWorks.length; i++){

        figureHtml += `
                            <figure> 
                                <img src="${filteredWorks[i].imageUrl}" alt= ${filteredWorks[i].title} > 
                                <figcaption>
                                    ${filteredWorks[i].title}
                                </figcaption> 
                            </figure>
                            `;
    }
    gallery.innerHTML=figureHtml;
}

async function chargementPage(){
    await fetchWorks();
    affichageTravaux(worksData);
}


tousFilter.addEventListener ('click', async () => {
    gallery.innerHTML = "";
    let filterCategory = null;
    const filteredData = await worksFilter(filterCategory);
    affichageTravaux(filteredData);
})

objetsFilter.addEventListener('click', async () => {
    gallery.innerHTML = "";
    const filterCategory = 'Objets'
    const filteredData = await worksFilter(filterCategory);
    await affichageTravaux(filteredData);
})
    
appartementsFilter.addEventListener('click', async () => {
    gallery.innerHTML = "";
    const filterCategory = 'Appartements'
    const filteredData = await worksFilter(filterCategory);
    await affichageTravaux(filteredData);
})

hotelsRestaurantsFilter.addEventListener('click', async () => {
    gallery.innerHTML = "";
    const filterCategory = 'Hotels & restaurants'
    const filteredData = await worksFilter(filterCategory);
    await affichageTravaux(filteredData);
})

chargementPage();