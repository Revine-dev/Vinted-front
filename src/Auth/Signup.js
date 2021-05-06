import { Link, useHistory } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";

const Signup = ({ logUser }) => {
  const history = useHistory();
  const errorRef = useRef();
  const [error, setError] = useState(false);

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const phone = "0606060606";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://vinted-appli.herokuapp.com/users/signup",
        {
          email: email,
          username: username,
          password: password,
          phone: phone,
        }
      );
      if (response.data.error) {
        return setError(response.data.error);
      }

      logUser(response.data.token);
      return history.push("/");
    } catch (error) {
      alert("Sorry, an error has occured");
    }
  };

  return (
    <section className="container auth">
      <h1>Signup</h1>
      <form className="auth" onSubmit={handleSubmit} method="post">
        <div
          className="error"
          ref={errorRef}
          style={{ display: error ? "block" : "none" }}
        >
          {error}
        </div>
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="newsletter">
          <input type="checkbox" id="newsletter" />
          <label htmlFor="newsletter">S'inscire à notre newsletter</label>
        </div>
        <p className="terms">
          En m'inscrivant, je confirme que j'ai accepté les{" "}
          <a href="/">Termes & Conditions</a> de Vinted, avoir lu la{" "}
          <a href="/">Politique de Confidentialité</a>, et que j'ai plus de 18
          ans.
        </p>

        <input type="submit" className="btn" value="S'inscrire" />
        <Link to="/login">Tu as déjà un compte ? Connecte toi !</Link>
      </form>
    </section>
  );
};

export default Signup;
