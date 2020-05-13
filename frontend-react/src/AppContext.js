import React from "react";
import Cookies from "js-cookie";

const AppContext = React.createContext({
    user: {},
    userLoginStatus: Cookies.get("auth-token") ? true : false,
    setUser: () => {},
    logUserIn: () => {},
    logUserOut: () => {},
})

export default AppContext;