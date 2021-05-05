import UserIcon from "./Logo";

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="sitename">My Bank</div>
        <div className="profile">
          Rems
          <UserIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
