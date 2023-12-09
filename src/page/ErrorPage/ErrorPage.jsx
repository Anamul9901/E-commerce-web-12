import { Link } from "react-router-dom";

 

const ErrorPage = () => {
    return (
        <div className="flex justify-center items-center h-[60vh]">
            <div className="text-center">
            <h2 className="text-3xl font-bold">Opps!! No Data Found</h2>
            <Link to='/'><button className="btn bg-[#f76b00] text-white font-bold btn-sm mt-5">Back Home</button></Link>
        </div>
        </div>
    );
};

export default ErrorPage;