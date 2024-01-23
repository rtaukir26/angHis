import userIcon from "../../assets/images/user.png";

const ListOfPeople = ({ allActiveUsers, handleOnUser }) => {
  let loginUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="online_user_con">
      {allActiveUsers?.length > 0 ? (
        <>
          {allActiveUsers?.map((item, i) => {
            if (item?.name !== loginUser?.user?.name) {
              return (
                <div
                  key={item?.keys}
                  className="online_user_div"
                  onClick={() => handleOnUser(item)}
                >
                  <div>
                    <img src={userIcon} alt="user" />
                  </div>
                  <div>
                    <p>{item?.name}</p>
                    <small>hey there</small>
                  </div>
                </div>
              );
            }
          })}
        </>
      ) : (
        // <li>No users are online</li>
        <>
          <div
            className="online_user_div"
            onClick={() => handleOnUser({ name: "Admin" })}
          >
            <div>
              <img src={userIcon} alt="user" />
            </div>
            <div>
              <p>Admin</p>
              <small>hey there</small>
            </div>
          </div>
          <div
            className="online_user_div"
            onClick={() => handleOnUser({ name: "Admin" })}
          >
            <div>
              <img src={userIcon} alt="user" />
            </div>
            <div>
              <p>Admin</p>
              <small>hey there</small>
            </div>
          </div>
          <div
            className="online_user_div"
            onClick={() => handleOnUser({ name: "Admin" })}
          >
            <div>
              <img src={userIcon} alt="user" />
            </div>
            <div>
              <p>Admin</p>
              <small>hey there</small>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ListOfPeople;
