import "./App.css";
import "./responsive.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useState } from "react";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Offer from "./Routes/Offer";
import Pay from "./Routes/Pay";
import Footer from "./Components/Footer";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import NewOffer from "./Components/NewOffer";

function App() {
  library.add(faUser, faSearch, faBars);
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [token, setCookie] = useState(Cookies.get("token") || false);
  const cookieSessionName = "token";

  const logUser = (tokenToSave) => {
    if (token) {
      return false;
    }
    setCookie(tokenToSave);
    Cookies.set(cookieSessionName, tokenToSave, { expires: 7 });
  };

  const destroySession = () => {
    Cookies.remove(cookieSessionName);
    setCookie(false);
  };

  return (
    <Router>
      <Header
        setSearch={setSearch}
        token={token}
        setCookie={setCookie}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        destroySession={destroySession}
      />
      <main>
        <Switch>
          <Route path="/signup">
            {token ? <Redirect to="/" /> : <Signup logUser={logUser} />}
          </Route>
          <Route path="/login">
            {token ? <Redirect to="/" /> : <Login logUser={logUser} />}
          </Route>
          <Route path="/offer/:id">
            <Offer logUser={logUser} />
          </Route>
          <Route path="/pay">
            {token ? <Pay token={token} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/publish">
            {token ? <NewOffer token={token} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/">
            <Home search={search} priceRange={priceRange} />
          </Route>
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
