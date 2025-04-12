

//time function to get the time , time conversion
const time = (time) => {
    const hour = parseInt(time / 3600);
    const remainingSecond = time % 3600;
    const min = parseInt(remainingSecond / 60);
    const second = remainingSecond % 60;
    return (`${hour} hour ${min} min ${second} second ago`);
}



//categories loading
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories)) //call the displayCategories 
        .catch(error => console.log(error)); //catch the  error if there any 
}

const displayCategories = (categories) => {
    for (const category of categories) {
        //create the dyanmic buttons for categories 
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
         <button id="button-${category.category_id}" onClick= "loadCategoryVideos(${category.category_id})" class="btn mr-5 btn category-btn">
         ${category.category}
         </button>
        `
        const categoryDiv = document.getElementById('category-section')
        categoryDiv.append(buttonContainer); //music,drawing,comedy
    }
}

const removeActiveButton = () => {
    const categoryButton = document.getElementsByClassName("category-btn");
    for(const btn of categoryButton){
       btn.classList.remove('active');
    }
}



//load category wise videos
function loadCategoryVideos(categoryId) {

    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${categoryId}`)
        .then(res => res.json())
        .then(data => {
            removeActiveButton();
            const activeButton = document.getElementById(`button-${categoryId}`);//show active
            activeButton.classList.add('active');
            displayVideos(data.category)
        }) //call the displayVideos function to show all videos
        .catch(error => console.log(error))

}



//load all the videos
const loadVideos = () => {

    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideos(data.videos)) //call the displayVideos function to show all videos
        .catch(error => console.log(error))

}


const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos')
    videosContainer.innerHTML = ""; //clear the videos container


    //if there is no videos , length then it will show nothing
    if (videos.length == 0) {
        videosContainer.classList.remove('grid')
        videosContainer.innerHTML = `
<div class=" h-[400px] flex flex-col justify-center items-center mx-auto">
    <img class= "h-[150px] " src="assets/Icon.png" alt="">
    <h1 class=" p-5 text-xl text-center font-extrabold w-10/12">Opss! Sorry there is no content here</h1>
</div>
        `
        return;
    }
    else {
        videosContainer.classList.add('grid');
    }

    for (const video of videos) {
        console.log(video)
        const card = document.createElement('div')
        card.classList.add('card')

        //card system
        card.innerHTML = ` 

          <figure class="p-1 h-[200px] relative">
   
      <img src="${video.thumbnail}"
      alt="Shoes"
      class="rounded-xl w-full h-full object-cover" />
      ${video.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-2 font-light text-xs text-white bg-black rounded p-2 m-3" >${time(video.others.posted_date)} </span>`}

          </figure>

 <div class="flex py-3 items-center"> 
   <div class="w-[30px] h-[30px] mr-3">
        <img src="${video.authors[0].profile_picture}" class="h-full w-full rounded-full object-cover" alt="">
   </div>

    <div>
        <h1 class="font-bold text-md">${video.title}</h1>
        <div class="flex justify-between items-center">

         <div class="flex items-center ">
          <p class="font-light text-sm mr-5"> ${video.authors[0].profile_name}</p>

          ${video.authors[0]?.verified ? '<img src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" class="w-2/20" alt="">' : ""}

        
         </div>
          <p class="font-light text-sm">${video.others.views} views</p>
        </div>
    </div>

 </div>

        `
        videosContainer.append(card)
    }

}

//functions call
loadCategories();
loadVideos()
