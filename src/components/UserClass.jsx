import React from "react";

class UserClass extends React.Component{

    constructor(props){
        super(props)
        
        this.state = {
            count : 0,
            count2: 2,
            userInfo: {
                name: "name",
                location: "location",
            }
        }

    }

    async componentDidMount(){ 
        const data = await fetch("https://api.github.com/users/anshul-purohit")
        const json = await data.json()
        console.log(json)

        this.setState({
            userInfo: json
        })
    }

    componentDidUpdate(){
        console.log("component did update")
    }

    componentWillUnmount(){
        console.log("component will unmount ")
    }

    render(){

        const {name,location,avatar_url} = this.state.userInfo;

        return (
            <div className='user-card' style={{padding: "10px", border: "2px solid black"}}>  
                <img src={avatar_url} alt="" />
                <h1>Name: {name}</h1>
                <h2>Location: {location}</h2>
                <h3>Contact: anshul@gmail.com</h3>
            </div>
          )
    }
}

export default UserClass;