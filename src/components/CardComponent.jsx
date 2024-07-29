import { CDN_URL } from "../utils/constant";

const CardComponent = ({resData}) => {
    const name = resData.info.name;
    const ratings = resData.info.avgRating;
    const time = resData.info.sla.deliveryTime;
    const im = resData.info.cloudinaryImageId;
    return (
        <div className="m-4 p-4 w-[250px] bg-gray-100 rounded-lg hover:bg-gray-200">
            <img className="rounded-lg" src={CDN_URL+im}></img>
            <h2 className="font-bold py-2 text-lg">{name}</h2>
            <h3>{ratings} ⭐️</h3>
            <h4>{time} mins</h4>
        </div>
    )
}

export default CardComponent;