import "./App.css";
import "./responsive.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Offer from "./Routes/Offer";
import Footer from "./Components/Footer";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route path="/offer/:id">
            <Offer />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
