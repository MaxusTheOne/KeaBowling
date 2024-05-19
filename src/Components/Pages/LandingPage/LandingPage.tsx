import { Link } from "react-router-dom";
import { useAuth } from "../../../Security/AuthProvider";
import "./LandingPage.css";

export default function LandingPage() {
  const auth = useAuth();
  return (
    <div className="landing-page">
      <div id="text-holder">
        <h1>Welcome to Kea Bowling!</h1>
        <div id="text-paragraphs">
          <p>
            Welcome to Kea Bowling's web app. This application is designed to
            make the administration of a bowling alley easier and more
            efficient. From booking lanes to managing equipment, this app has it
            all.
          </p>
          <p>
            With this app, you can easily manage reservations, keep track of
            equipment, manage user accounts, and even create and manage shift
            schedules. Everything is designed to be as intuitive and
            user-friendly as possible.
          </p>
          <p>
            To get started, simply use the sidebar on the left. Here you can
            navigate through the various functions and see what this app has to
            offer. Enjoy using Kea Bowling's web app!
          </p>
        </div>

        <div>
          {!auth.isLoggedIn() && (
            <div id="double-button-holder">
              <Link to="/new-account" className="landing-page-button">
                Create Account
              </Link>
              <Link to="/login" className="landing-page-button">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>

      <div id="image-holder">
        <img src="../../../../public/image.jpg" alt="Bowling Alley" />
      </div>

      <div id="landing-page-footer">
        <div id="github-links">
          <a href="https://github.com/MaxusTheOne/KeaBowling">
            <img src="../../../../public/github-mark-white.png"></img>
          </a>
        </div>
        <p>Developed by Markus Lindeberg Bille & Malte Mørkeberg Sørensen</p>
      </div>
    </div>
  );
}
