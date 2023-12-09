import useAdmin from "../../../hooks/useAdmin";
import useAuth from "../../../hooks/useAuth";
import useModarator from "../../../hooks/useModarator";



const HomeDashboard = () => {
    const { user } = useAuth();
    const [isAdmin] = useAdmin();
    const [isModarator] = useModarator(); 
    return (
        <div className="md:flex justify-center items-center gap-4 pt-10">
            <div>
            <h2 className="md:text-3xl text-xl font-bold text-center">
                Welcome
                
                {
                    isAdmin && <span className="text-[#f76b00]"> Admin</span>
                }
                {
                    isModarator &&<span className="text-[#f76b00]"> Modarator</span>
                }
            
                {user ?
                    ` ${user.displayName}` : 'Back'
                }
            </h2>
            <p className="flex justify-center pt-10">
                <img className="md:w-40 rounded-xl" src={user?.photoURL} alt="" />
            </p>
                <h2 className="text-center pt-2">{user?.email}</h2>
            </div>
            
        </div>
    );
};

export default HomeDashboard;