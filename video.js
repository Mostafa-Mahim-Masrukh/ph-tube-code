const time = (time) => {
    const hour = parseInt(time / 3600);
    const remainingSecond = time % 3600;
    const min = parseInt(remainingSecond / 60);
    const second = remainingSecond % 60;
    return (`${hour} hour ${min} min ${second} second ago`);
}










const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error));
}

const displayCategories = (categories) => {
    for (const category of categories) {
        //create a button
        const button = document.createElement('button');
        button.classList.add('btn');
        button.classList.add('mx-5');
        button.innerText = category.category;

        const categoryDiv = document.getElementById('category-section')
        categoryDiv.append(button);
    }
}


const loadVideos = () => {

    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.log(error))

}


const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos')
    for (const video of videos) {
        console.log(video)
        const card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = `




          <figure class="p-1 h-[200px] relative">
   
      <img src="${video.thumbnail}"
      alt="Shoes"
      class="rounded-xl w-full h-full object-cover" />


      ${video.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-2 text-white bg-black rounded p-2 m-3" >${time(video.others.posted_date)} </span>`}



     

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

          ${video.authors[0].verified ? '<img src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" class="w-2/20" alt="">' : ""}

          
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
