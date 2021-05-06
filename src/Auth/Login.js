import { Link, useHistory } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";

const Login = ({ logUser }) => {
  const history = useHistory();
  const errorRef = useRef();
  const [error, setError] = useState(false);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return setError("Tous les champs sont requis");
    }

    try {
      const response = await axios.post(
        "https://vinted-appli.herokuapp.com/users/login",
        {
          email: email,
          password: password,
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
      <h1>Se connecter</h1>
      <form className="auth" onSubmit={handleSubmit} method="post">
        <div
          className="error"
          ref={errorRef}
          style={{ display: error ? "block" : "none" }}
        >
          {error}
        </div>
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

        <input type="submit" className="btn" value="Se connecter" />
        <Link to="/signup">Tu n'es pas inscrit ? Inscrit toi !</Link>
      </form>
    </section>
  );
};

export default Login;
