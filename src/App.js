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
import Footer from "./Components/Footer";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";

function App() {
  library.add(faUser, faSearch);
  const [search, setSearch] = useState("");
  const [token, setCookie] = useState(Cookies.get("token") || false);
  const cookieSessionName = "token";

  const logUser = (tokenToSave) => {
    if (token) {
      return false;
    }
    setCookie(tokenToSave);
    Cookies.set(cookieSessionName, tokenToSave, { expires: 7 });
  };

  return (
    <Router>
      <Header
        setSearch={setSearch}
        token={token}
        setCookie={setCookie}
        cookieSessionName={cookieSessionName}
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
          <Route path="/">
            <Home search={search} />
          </Route>
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
