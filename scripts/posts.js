async function fetchPosts() {
  const res = await fetch(
    //"https://api.jsonbin.io/v3/b/69079ca6ae596e708f400606",
    "./posts.json",
  );
  const data = await res.json();
  const posts = data.record.posts;

  return posts;
}

function createPostElement(post) {
  const article = document.createElement("article");
  article.className = "post";

  // header
  const header = document.createElement("header");

  const authorImg = document.createElement("img");
  authorImg.src = post.authorImage;
  authorImg.width = 50;
  authorImg.alt = "The Author's profile picture";

  const dateP = document.createElement("p");
  dateP.textContent = post.date;

  header.appendChild(authorImg);
  header.appendChild(dateP);

  article.appendChild(header);

  // optional image
  if (post.image) {
    const img = document.createElement("img");
    img.src = post.image;
    img.alt = "";
    article.appendChild(img);
  }

  // text paragraph
  const textP = document.createElement("p");
  textP.textContent = post.text;
  article.appendChild(textP);

  // like link with Font Awesome icon
  const likeLink = document.createElement("a");
  likeLink.href = "#";
  const icon = document.createElement("i");
  icon.className = "fa-regular fa-thumbs-up";
  likeLink.appendChild(icon);
  article.appendChild(likeLink);

  return article;
}

async function renderPosts() {
  const main = document.querySelector("main");
  if (!main) {
    console.warn("Missing <main>??");
    return;
  }

  const existingPosts = main.querySelectorAll(".post");
  existingPosts.forEach((p) => p.remove());

  const posts = await fetchPosts();

  // If there are no posts, you could optionally render a message. For now do nothing.
  posts.forEach((postData) => {
    const postEl = createPostElement(postData);
    main.appendChild(postEl);
  });
}
renderPosts();
