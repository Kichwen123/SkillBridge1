
const DashboardNavBar = () => {
    return ( 
        <div>
            <nav className="d-flex justify-content-between">
                <div>
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
                        backgroundColor: "#DF301C"
                    }}
                    >
                        Logout
                    </button>
                </div>
            </nav>
        </div>
     );
}
 
export default DashboardNavBar;