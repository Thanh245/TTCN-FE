const Auth = {
    isAuthenticated: false,
    login() {
      this.isAuthenticated = true;
    },
    logout() {
      this.isAuthenticated = false;
    },
    getAuth() {
      return this.isAuthenticated;
    },
};
    
export default Auth;