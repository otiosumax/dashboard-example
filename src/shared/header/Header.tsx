import "./Header.css";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import CustomButton from "../customButton/CustomButton";
import pfp from "../../assets/pfp.webp";

function Header() {
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="header border-b">
      <p className="bold">Dashboard example</p>
      <nav className="header-navigation">
        <Link to="/">
          <CustomButton isActive={location.pathname === "/"}>
            <p>Панель мониторинга</p>
          </CustomButton>
        </Link>
        <Link to="/data">
          <CustomButton isActive={location.pathname === "/data"}>
            <p>Управление маршрутами</p>
          </CustomButton>
        </Link>
      </nav>
      <div />
      <p>{currentTime.toLocaleTimeString('ru-RU')}</p>
      <img src={pfp} />
    </div>
  );
}

export default Header;
