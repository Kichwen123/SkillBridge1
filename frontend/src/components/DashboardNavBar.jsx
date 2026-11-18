import { FaArrowRightToBracket } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { authActions } from "../store/auth.js";
import { useEffect } from "react";



const DashboardNavBar = () => {
const backendLink = useSelector((state)=> state.prod.link);
useEffect(()=>{
const fetchUserDetails = async ()=>{
    try {
        const response = await axios.get(`${backendLink}/api/v1/auth/user-details`,{
            withCredentials:true
        });
        console.log(response);
    } 
    catch (error) {
        console.log(error.response);
    }
}
fetchUserDetails();
}, []);

    return ( 
        <div>
            <nav className="d-flex justify-content-between">
                <div className="text-light">
                    <h5>
                       Welcome Admin  {/* we will replace this with username */}
                    </h5>
                    <p>
                        One central place to manage all your data.
                    </p>
                </div>
                <div>
                    <button 
                    className="btn"
                    style={{
                        backgroundColor: "#E8E085"
                    }}
                    >
                        Logout <span className="ms-3"> <FaArrowRightToBracket /> </span>
                    </button>
                </div>
            </nav>
        </div>
     );
}
 
export default DashboardNavBar;