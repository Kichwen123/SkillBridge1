import { FaArrowRightToBracket } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { authActions } from "../store/auth.js";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";




const DashboardNavBar = () => {
    const backendLink = useSelector((state) => state.prod.link);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.user);
    const redirect = useNavigate();
    //console.log(userData);
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${backendLink}/api/v1/auth/user-details`, {
                    withCredentials: true
                });
                //console.log(response.data.user);
                dispatch(authActions.login(response.data.user)); // store the user details in a redux state
            }
            catch (error) {
                toast.error(error.response.data.message);
            }
        }
        if (!userData) {
            fetchUserDetails();

        }
    }, [backendLink, dispatch, userData]);
    //Logout the user
    const logoutUser = async () => {
        try {
            const response = await axios.post(`${backendLink}/api/v1/auth/logout`, {}, {
                withCredentials: true
            });
            dispatch(authActions.logout());
            redirect("/");
            toast.success(response.data.message)
        }
        catch (error) {
            toast.error(error.response.data.message)

        }
    }
    return (
        <div>
            <nav className="d-flex justify-content-between">
                <div className="text-light">
                    <h5>
                        Welcome {userData?.fullname}  {/* we will replace this with username */}
                    </h5>
                    <p>
                        Your email : {userData?.email}
                    </p>
                    <p>Your phone : {userData?.phone}</p>

                    <Link className="btn btn-primary" to="/">
                        Home
                    </Link>
                </div>
                <div>
                    <button
                        onClick={logoutUser}
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