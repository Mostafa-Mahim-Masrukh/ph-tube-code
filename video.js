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
          <figure class="p-1 h-[200px]">
    <img
      src="${video.thumbnail}"
      alt="Shoes"
      class="rounded-xl w-full h-full object-cover" />
  </figure>
 <div class="flex py-3 "> 
   <div class="w-[30px] h-[30px] mr-3">
        <img src="${video.authors[0].profile_picture}" class="h-full w-full rounded-full object-cover" alt="">
   </div>

    <div>
        <h1 class="font-bold text-md">${video.title}</h1>
        <p class="font-light text-sm my-2"> ${video.authors[0].profile_name}</p>
        <p class="font-light text-sm">${video.others.views}</p>
    </div>

 </div>
        
        `
        videosContainer.append(card)
    }

}







loadCategories();
loadVideos()
