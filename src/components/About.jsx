import UserContext from "../utils/UserContext";
import User from "./User";
import UserClass from "./UserClass";
import React, { useContext } from "react";

const About = () => {

    const {loggedInUser} = useContext(UserContext)

    return(
        <>
            <h1>Hello World</h1>
            <h2>This is about section</h2>
            <h3>LoggedIn User : {loggedInUser}</h3>
            {/* <User name={"Anshul Purohit (function)"} location={"Dehradun (function)"}/> */}
            {/* <UserClass name={"First Child"} location={"Dehradun (class)"}/>
            <UserClass name={"Second Child"} location={"Dehradun (class)"}/>
            <UserClass name={"Third Child)"} location={"Dehradun (class)"}/> */}
        </>
    )
}

export default About;