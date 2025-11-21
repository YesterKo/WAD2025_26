<template>
  <header>
    <nav class="main-nav">
      <ul>
        <!-- Top navigation: Home + addPost only -->
        <li><a href="index.html">Home</a></li>
        <li><a href="addPost.html">addPost</a></li>
      </ul>

      <div class="user-profile">
        <button
          class="profile-btn"
          id="profileBtn"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img src="img/pfp1.jpg" alt="Kadri Paan" width="40" height="40" />
        </button>

        <!-- All auth actions in the dropdown -->
        <div class="dropdown" id="profileDropdown">
          <ul class="menu">
            <li class="menu-name">John Doe</li>
            <li class="menu-email">john.doe@ut.ee</li>
            <li><a class="menu-link" href="login.html">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
