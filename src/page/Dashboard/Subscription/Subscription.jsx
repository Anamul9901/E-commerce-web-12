import { Link } from "react-router-dom";


const Subscription = () => {

    const handleAddMony = (money) =>{ 
        localStorage.setItem('money', parseFloat(money))
    }

    return (
        <div>
            <h2 className="text-center font-bold py-4 mb-5 text-3xl">Unlock Limited Products</h2>
            <div className="md:flex gap-5 justify-center">

                <Link to='/dashboard/payment'>
                    <div onClick={()=>handleAddMony(10)} className="stats shadow mb-3 bg-yellow-200">
                        <div className="stat">
                            <div className="stat-title"></div>
                            <div className="stat-value text-center mb-3">$10</div>
                            <div className="stat-desc font-bold ">For added 200 products</div>
                        </div>
                    </div>
                </Link>

                <Link to='/dashboard/payment'>
                    <div onClick={()=>handleAddMony(20)} className="stats shadow mb-3 bg-yellow-400">
                        <div className="stat">
                            <div className="stat-title"></div>
                            <div className="stat-value text-center mb-3">$20</div>
                            <div className="stat-desc font-bold">For added 450 products</div>
                        </div>
                    </div>
                </Link>

                <Link to='/dashboard/payment'>
                    <div onClick={()=>handleAddMony(50)} className="stats shadow mb-3 bg-yellow-500">
                        <div className="stat">
                            <div className="stat-title"></div>
                            <div className="stat-value text-center mb-3">$50</div>
                            <div className="stat-desc font-bold">For added 1500 products</div>
                        </div>
                    </div>
                </Link>

            </div>
        </div>
    );
};

export default Subscription;