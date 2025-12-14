export default {
  requireAuth: async function (to, from, next) {
    async function authenticated() {
      var user = { authenticated: false };
      await fetch("http://localhost:3000/authenticate", {
        credentials: "include", //  Don't forget to specify this if you need cookies
      })
        .then((response) => response.json())
        .then((data) => {
          user.authenticated = data.authenticated;
          console.log(data);
        })
        .catch((e) => {
          console.log(e);
          console.log("error logout");
        });
      return user.authenticated;
    }

    let authResult = await authenticated();
    if (!authResult) {
      next("/login");
    } else {
      next();
    }
  },
};
