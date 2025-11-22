<template>
  <article class="post">
    <header>
      <img src="img/pfp1.jpg" width="50" alt="The Author's profile picture" />
      <p>Oct 3, 2025</p>
    </header>
    <img src="img/food.jpg" />
    <p>Jippie food!</p>
    <a href="#"><i class="fa-regular fa-thumbs-up"></i></a>
  </article>
</template>
<style>
.post {
  background-color: #f3c1d9;
  border-radius: 1rem;
  padding: 1rem;
  max-width: 90ch;
  margin: 2rem auto;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      border-radius: 50%;
    }
  }

  > img {
    max-width: 100%;
    border-radius: 1rem;
    margin-top: 1rem;
  }
}
</style>
