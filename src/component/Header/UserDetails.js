import profileIcon from "../../assets/images/profile2.png";

const UserDetails = ({ handleClickLogout }) => {
  let loginUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="user_details_con">
      <div className="user_header">
        <img src={profileIcon} alt="user icon" />
        <div>
          <p>{loginUser?.user?.name}</p>
          <p>{loginUser?.user?.email}</p>
        </div>
      </div>
      <p className="confirm_text">Are you sure you want to logout?</p>
      <div className="btn_grp">
        <button>No</button>
        <button onClick={handleClickLogout}>Yes</button>
      </div>
    </div>
  );
};

export default UserDetails;
