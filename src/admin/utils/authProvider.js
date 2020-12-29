
const authProvider = {
    // called when the user attempts to log in

    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem('username');
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem("username")
            ? Promise.resolve()
            : window.location.assign("http://localhost:3000");
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => {
        return localStorage.getItem("role") === "ROLE_ADMIN"? Promise.resolve() : Promise.reject();
    }
};

export default authProvider;