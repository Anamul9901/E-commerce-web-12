

const ClientReviews = () => {
    return (
        <div className="pt-4 pb-20">
            <h2 className="text-center md:text-4xl text-2xl font-bold pb-10">Client’s<span className="text-[#f76b00]"> Reviews</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 justify-center md:px-0 px-10">

                <div className="card  bg-neutral text-neutral-content">
                    <div className="card-body items-center text-center">
                        <div className="flex gap-2">
                        <img className="rounded-xl" src={'https://i.ibb.co/z6QN3Jr/client-1.png'} alt="" />
                        <h2 className="card-title">Susan Hernandez</h2>
                        </div>
                        <p>I cannot express how impressed I am with Cobbler customer service. They went above and beyond to ensure I got the right pair of shoes that suited my style.</p>
                    </div>
                </div>
                <div className="card  bg-neutral text-neutral-content">
                    <div className="card-body items-center text-center">
                        <div className="flex gap-2">
                        <img className="rounded-xl" src={'https://i.ibb.co/TBJxQfS/Image-2.png'} alt="" />
                        <h2 className="card-title">Richard Johnson</h2>
                        </div>
                        <p>
                                Cobbler shoes are a work of art. Each pair is meticulously crafted with precision and passion. I am constantly impressed by the unique designs and the level of comfort.
                            </p>
                    </div>
                </div>
                <div className="card  bg-neutral text-neutral-content">
                    <div className="card-body items-center text-center">
                        <div className="flex gap-2">
                        <img className="rounded-xl" src={'https://i.ibb.co/VTV17v1/Image.png'} alt="" />
                        <h2 className="card-title">Rilu Khan</h2>
                        </div>
                        <p>The staff was great. The receptionists were very helpful and answered all our questions. The room was clean and bright, and the room service was always on time. Will be coming back! Thank you so much.</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ClientReviews;