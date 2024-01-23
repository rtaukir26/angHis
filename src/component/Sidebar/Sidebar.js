const Sidebar = () => {
  return (
    <div className="sidebar_con">
      <div className="search_div">
        <input type="text" placeholder="search by festival name" />
      </div>
      <ul>
        <li>All</li>
        <li>Rakshbandhan</li>
        <li>Independence day</li>
        <li>Republic day</li>
        <li>Wedding</li>
        <li>Function</li>
      </ul>
    </div>
  );
};

export default Sidebar;
