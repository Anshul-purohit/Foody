import CardComponent from "./CardComponent";
import { useContext, useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {

    let [resList,setResList] = useState([]);
    const [updateResList,setUpdateResList] = useState([]);
    const [searchText,setSearchText] = useState("");


    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = async () => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.49690&lng=80.32460&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );

        const json = await data.json();
        console.log(json)
        // Optional Chaining
        setResList(json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        setUpdateResList(json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    }

    const onlineStatus = useOnlineStatus();
    if(onlineStatus === false)
        return <h1>Looks like you're offline!! Please check your internet connection.</h1>

    const {loggedInUser,setUserName} = useContext(UserContext);

    return resList.length === 0 ? <Shimmer/> : (
        <div className="body">
            <div className="filter flex">
                <div className="search m-4 p-4">
                    <input 
                        type="text" 
                        className="border border-solid border-black" 
                        value={searchText} 
                        onChange={(e) => {
                            setSearchText(e.target.value)
                        }}
                    />
                    <button className="px-4 py-1 bg-green-200 m-4 rounded-lg"
                        onClick={() => {
                            const filteredResList = resList.filter((res) => {
                                return res.info.name.toLowerCase().includes(searchText.toLowerCase())
                            })
                            setUpdateResList(filteredResList)
                        }}
                    >   
                        Search
                    </button>
                </div>
                <div className="search m-4 p-4 flex items-center">
                    <button 
                        className="px-4 py-1 bg-gray-200 m-4 rounded-lg"
                        onClick={()=>{
                            setUpdateResList(resList.filter(
                                (res) => res.info.avgRating>=4.0
                            ))
                            console.log(resList)
                        }
                        }
                    >
                        Top rated restaurant
                    </button>
                </div>
                <div className="search m-4 p-4 flex items-center">
                    <label className="p-2">Username : </label>
                    <input type="text" className="border border-black p-2" value={loggedInUser} onChange={(e) => setUserName(e.target.value)}/>
                </div>
            </div>
            

            <div className="flex flex-wrap">
                {updateResList.map((res) => (
                    <Link key={res.info.id} to={"/restaurants/" + res.info.id}><CardComponent resData={res}/></Link>
                ))}
            </div>
        </div>
    )
}

export default Body;