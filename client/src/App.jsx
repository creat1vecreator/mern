import React from 'react';
import {useRoutes} from './routes';
import {BrowserRouter} from 'react-router-dom';
import {storageName, useAuth} from "./hooks/auth.hook";
import 'materialize-css';
import {AuthContext} from "./context/AuthContext";
import {NavBar} from "./components/NavBar";

function App() {
    const {token, login, logout, userId} = useAuth();
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated);

    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
        <BrowserRouter>
            {isAuthenticated && <NavBar/>}
            <div className='container'>
                {routes}
                {console.log("TOKEN IN APP: ", token)}
                {console.log("LOGIN IN APP: ", login)}
                {console.log("LOGOUT IN APP: ",logout)}
                {console.log("USERID IN APP: ", userId )}
                {console.log(" ISAUTHENTICATED IN APP: ", isAuthenticated)}
                {console.log("============================>")}
                {localStorage.getItem(storageName)}




            </div>
        </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;