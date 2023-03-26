import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";

function Header() {
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const handlelogout = (event) => {
    localStorage.removeItem("username");
    localStorage.removeItem("cookie");
    setLoggedIn(false);
  };
  return (
    <header>
      <div className="site-name">
        <a href="/">Teklif-Ver</a>
      </div>

      {loggedIn ? (
        <nav>
          <ul>
            <li>
              <button onClick={handlelogout}>Çıkış Yap</button>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li>
              <a href="/register">Kayıt Ol</a>
            </li>
            <li>
              <a href="/login">Giriş Yap</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
