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



loadCategories();

