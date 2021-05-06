import "./App.css";
import "./responsive.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Offer from "./Routes/Offer";
import Footer from "./Components/Footer";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";

function App() {
  library.add(faUser, faSearch);
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header setSearch={setSearch} />
      <main>
        <Switch>
          <Route path="/offer/:id">
            <Offer />
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
