import { Helmet } from "react-helmet-async";
import ClientReviews from "../../../components/Clientreviews/ClientReviews";
import Slider from "../../../components/Slider/Slider";
import Soldproduct from "../../../components/SoldProduct/Soldproduct";
import HomeItem from "../../../components/HomeItem/HomeItem";
import Factory from "../../../components/Factory/Factory";


const Home = () => {
    return (
        <div className="max-w-[1300px] mx-auto w-full">
            <Helmet>
                <title>e-SHOP || Home</title>
            </Helmet>
            <Slider />
            <HomeItem />
            <Soldproduct />
            <Factory />
            <ClientReviews />
        </div>
    );
};

export default Home;