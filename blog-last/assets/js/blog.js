let posts = [];
let id = 0;

if (localStorage.posts) {
  posts = JSON.parse(localStorage.posts);
  renderPosts();
}

if (localStorage.id) {
  id = Number(localStorage.id);
}

function generateId() {
  id++;
  localStorage.id = id;
  return id;
}

function save() {
  localStorage.posts = JSON.stringify(posts);
}

function renderPosts() {
  allPosts.innerHTML = '';
  categoryPosts.innerHTML = '';

  let categoryLists = {};

  posts.forEach(post => {
    let listItem = `<li data-postid="${post.id}">
            <img src="${post.image}" alt="${post.title}" style="width: 50px; height: 50px;">
            ${post.title} - ${post.author} 
            <a href="#" class="editPostBtn" data-postid="${post.id}">Düzenle</a>
            <a href="#" class="deletePostBtn" data-postid="${post.id}">Sil</a>
        </li>`;
    allPosts.innerHTML += listItem;

    if (!categoryLists[post.category]) {
      categoryLists[post.category] = [];
    }
    categoryLists[post.category].push(`<li><img src="${post.image}" alt="${post.title}" style="width: 50px; height: 50px;"> ${post.title} - ${post.author} <p>Açıklama:  ${post.description} </p> </li>`);
  });

  posts.forEach(post => {
    if (categoryLists[post.category]) {
      let categoryHTML = `<h3>${post.category.toUpperCase()}</h3><ul>`;
      categoryLists[post.category].forEach(item => {
        categoryHTML += item;
      });
      categoryHTML += '</ul>';
      categoryPosts.innerHTML += categoryHTML;
      delete categoryLists[post.category];
    }
  });

  document.querySelectorAll('.editPostBtn').forEach(btn => btn.addEventListener('click', handleEditBtn));
  document.querySelectorAll('.deletePostBtn').forEach(btn => btn.addEventListener('click', handleDeleteBtn));
}

addPostBtn.addEventListener('click', () => {
  modal.classList.remove('editModal');
  document.querySelector('input[name="id"]').value = "";
  modal.showModal();
});

blogForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let formData = new FormData(blogForm);
  let formObj = Object.fromEntries(formData);
  blogForm.reset();

  if (formObj.id !== '') { // güncelle
    let post = posts.find(x => x.id === Number(formObj.id));
    post.title = formObj.title;
    post.description = formObj.description;
    post.author = formObj.author;
    post.category = formObj.category;
    post.image = formObj.image;
  } else { // yeni ekle
    formObj.id = generateId();
    posts.push(formObj);
  }

  save();
  renderPosts();
  modal.close();
});

document.querySelector('#clearLocalStorageBtn').addEventListener('click', function () {
  if (!confirm('Emin misin?')) {
    return;
  }
  localStorage.removeItem('posts');
  localStorage.removeItem('id');
  posts = [];
  id = 0;
  renderPosts();
});

function handleDeleteBtn(e) {
  e.preventDefault();

  if (!confirm('Emin misin?')) {
    return;
  }
  posts = posts.filter(x => x.id !== Number(this.dataset.postid));

  save();
  renderPosts();
}

function handleEditBtn(e) {
  e.preventDefault();
  modal.classList.add('editModal');
  let postId = Number(this.dataset.postid);
  let post = posts.find(x => x.id === postId);
  document.querySelector('input[name="id"]').value = post.id;
  document.querySelector('input[name="title"]').value = post.title;
  document.querySelector('textarea[name="description"]').value = post.description;
  document.querySelector('input[name="author"]').value = post.author;
  document.querySelector('select[name="category"]').value = post.category;
  document.querySelector('input[name="image"]').value = post.image;
  modal.showModal();
}

renderPosts();
