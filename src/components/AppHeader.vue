<template>
  <header>
    <nav class="main-nav">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/signup">Sign Up</router-link></li>
      </ul>

      <div class="user-profile">
        <button
          class="profile-btn"
          id="profileBtn"
          ref="btn"
          aria-haspopup="true"
          :aria-expanded="menuOpen.toString()"
          @click.stop="toggleMenu"
        >
          <img
            src="@/assets/pfp1.jpg"
            alt="Kadri Paan"
            width="40"
            height="40"
          />
        </button>

        <div
          class="dropdown"
          id="profileDropdown"
          ref="menu"
          :class="{ open: menuOpen }"
        >
          <ul class="menu">
            <li class="menu-name">John Doe</li>
            <li class="menu-email">john.doe@ut.ee</li>
            <li>
              <router-link class="menu-link" to="/signup">Logout</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "AppHeader",

  data() {
    return {
      menuOpen: false,
    };
  },

  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },

    closeMenuOnOutsideClick(e) {
      // check if clicked outside
      const btn = this.$refs.btn;
      const menu = this.$refs.menu;

      if (!btn || !menu) return;

      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        this.menuOpen = false;
      }
    },

    closeMenuOnEscape(e) {
      if (e.key === "Escape") this.menuOpen = false;
    },
  },

  mounted() {
    window.addEventListener("click", this.closeMenuOnOutsideClick);
    window.addEventListener("keydown", this.closeMenuOnEscape);
  },

  beforeUnmount() {
    window.removeEventListener("click", this.closeMenuOnOutsideClick);
    window.removeEventListener("keydown", this.closeMenuOnEscape);
  },
};
</script>

<style>
.main-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8abd1;
  padding: 8px 12px;
  border-radius: 6px;
}

/* Only apply flex to top-level nav list */
.main-nav > ul {
  display: flex;
  gap: 12px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.main-nav a {
  color: #222;
  text-decoration: none;
}

.main-nav ul li a:hover {
  background-color: #093756; /* Darker blue on hover */
}

/* User profile avatar and dropdown container */
.user-profile {
  position: relative;
}
.profile-btn {
  border: 0;
  background: transparent;
  cursor: pointer;
  border-radius: 50%;
  padding: 0;
}
.profile-btn img {
  display: block;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

/* Dropdown menu styling */
.dropdown {
  position: absolute;
  top: 42px;
  right: 0;
  min-width: 180px;
  background: #f3f3f3;
  border: 1px solid #bdbdbd;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 8px 10px;
  opacity: 0;
  transform: translateY(-6px);
  pointer-events: none;
  transition: opacity 0.12s ease, transform 0.12s ease;
  z-index: 1000;
}

/* Show dropdown when active */
.dropdown.open {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

/* Stack dropdown items vertically */
.dropdown .menu {
  display: flex;
  flex-direction: column;
  gap: 6px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.dropdown .menu li {
  display: block;
}

/* Dropdown text styling */
.menu-name {
  font-weight: 600;
  color: #222;
}
.menu-email {
  color: #444;
  font-size: 0.95rem;
}
.menu-link {
  color: #222;
  text-decoration: none;
}
.menu-link:hover {
  text-decoration: underline;
}
.main-footer {
  background-color: #f8abd1;
  padding: 10px;
  text-align: center;
  margin-top: 10px;
  font-size: 0.9rem;
}
</style>
