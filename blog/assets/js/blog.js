let blogForm = document.querySelector('#blogForm');
let allPosts = document.querySelector('#allPosts');
let categoryPosts = document.querySelector('#categoryPosts');
let clearLocalStorageBtn = document.querySelector('#clearLocalStorage');

let getPostsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('blogPosts')) || [];
};

let savePostsToLocalStorage = (posts) => {
  localStorage.setItem('blogPosts', JSON.stringify(posts));
};


let displayPosts = () => {
  let posts = getPostsFromLocalStorage();
  allPosts.innerHTML = '';
  categoryPosts.innerHTML = '';

  let categoryLists = {};

  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];
    let listItem = `${post.title} - ${post.author}<br>`;
    allPosts.innerHTML += listItem;

    if (!(post.category in categoryLists)) {
      categoryLists[post.category] = [];
    }
    categoryLists[post.category].push(`<li>${post.title} - ${post.author}</li>`);
  }

  for (let category in categoryLists) {
    let categoryHTML = `<h3>${category.toUpperCase()}</h3><ul>`;
    for (let i = 0; i < categoryLists[category].length; i++) {
      categoryHTML += categoryLists[category][i];
    }
    categoryHTML += '</ul>';
    categoryPosts.innerHTML += categoryHTML;
  }
};

blogForm.addEventListener('submit', function (event) {
  event.preventDefault();

  let title = this.title.value;
  let description = this.description.value;
  let author = this.author.value;
  let category = this.category.value;

  let newPost = { title, description, author, category };

  let posts = getPostsFromLocalStorage();
  posts.push(newPost);
  savePostsToLocalStorage(posts);

  displayPosts();

  this.reset();
});

clearLocalStorageBtn.addEventListener('click', function () {
  localStorage.removeItem('blogPosts');
  displayPosts();
});

displayPosts();
