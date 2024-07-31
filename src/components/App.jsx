import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./Header";
import Body from "./Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import Error from "./Error";
import RestaurantMenu from "./RestaurantMenu";
import UserContext from "../utils/UserContext";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import Cart from "./Cart";
// import Grocery from "./Grocery";

const Grocery = lazy(() => import("./Grocery"))

const App = () => {

    const {loggedInUser} = useContext(UserContext)
    const [userName,setUserName] = useState(loggedInUser)

    useEffect(() => {
        const data = {
            name: "Anshul Purohit"
        }

        setUserName(data.name)

        // const savedUserName = localStorage.getItem("loggedInUser");
        // if (savedUserName) {
        //     setUserName(savedUserName);
        // }
    },[])

    // useEffect(() => {
    //     localStorage.setItem("loggedInUser", userName);
    // }, [userName]);


    return (
        <Provider store={appStore}>
            <UserContext.Provider value={{loggedInUser: userName, setUserName}}>
                <div>
                    <Header/>
                    <Outlet/>
                </div>
            </UserContext.Provider>
        </Provider>
    )
}

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Body/>
            },
            {
                path: "/about",
                element: <About/>
            },
            {
                path: "/contact",
                element: <Contact/>
            },
            {
                path: "/grocery",
                element: <Suspense fallback={<><h1>Loading...</h1></>}><Grocery/></Suspense>
            },
            {
                path: "restaurants/:resID",
                element: <RestaurantMenu/>
            },
            {
                path: "/cart",
                element: <Cart/>
            }
        ],
        errorElement: <Error />
    },
])

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter}/>);

export default App;