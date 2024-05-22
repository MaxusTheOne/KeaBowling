import { useState } from "react";
import { useAuth } from "../../../Security/AuthProvider";
import { User } from "../../../Services/authFacade";
import { NavLink } from "react-router-dom";

const CreateAccountPage = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const auth = useAuth();

  const [err, setErr] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const user = Object.fromEntries(formData) as unknown as User;

    if (user.password !== user.confirmPassword) {
      setErr("Kodeordene er ikke ens");
      return;
    }
    auth
      .create(user)
      .then(() => {
        auth
          .signIn(user)
          .then(() => {
            // wait 1 second to ensure that the user is created before navigating.
            setTimeout(() => (window.location.pathname = "/my-page"), 1000);
          })
          .catch((err) => {
            setErr(err);
          });
      })
      .catch((err) => {
        setErr(err);
      });
  }

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 id="login-title">Create Account | Kea Bowling</h2>
        <div className="login-form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            min="3"
            max="20"
            value={user.username}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, username: e.target.value }))
            }
            required
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="email">E-mail address:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, email: e.target.value }))
            }
            required
          />
        </div>
        <hr />
        <div className="login-form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, password: e.target.value }))
            }
            required
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, confirmPassword: e.target.value }))
            }
            required
          />
        </div>
        <hr />
        <br />

        <button type="submit" className="login-btn">
          Create Account
        </button>
        <NavLink to="/login">Already have an account? Sign in.</NavLink>
        {err && <p className="login-error">{err}</p>}
      </form>
    </div>
  );
};

export default CreateAccountPage;
