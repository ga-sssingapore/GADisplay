import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./pages_css/AdminLoginPage.module.css";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { fetchData } from "../helpers/common";

function AdminLoginPage(props) {
  const emailRef = useRef();
  const pwRef = useRef();
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    if (emailRef.current.value == "") {
      alert("Please enter email!");
      return emailRef.current.focus();
    } else if (pwRef.current.value == "") {
      alert("Please enter password!");
      return pwRef.current.focus();
    }
    try {
      const { ok, data } = await fetchData("/auth/login", undefined, "POST", {
        email: emailRef.current.value,
        password: pwRef.current.value,
      });

      if (ok) {
        localStorage.setItem("GAacc", data.access);
        localStorage.setItem("GAref", data.refresh);
        props.setAccessToken(data.access);
        const decoded = jwtDecode(data.access);
        props.setClaims(decoded);
        props.setIsLoggedIn(true);
        alert(`Logged in as user: ${decoded.name}`);
        navigate("/admin/dashboard");
      } else {
        throw new Error(data);
      }
    } catch (error) {
      console.log(error.message);
      alert("Error logging in, please try again");
    }
  }

  // async function handleLogin(event) {
  //   event.preventDefault();
  //   if (emailRef.current.value == "") {
  //     alert("Please enter email!");
  //     return emailRef.current.focus();
  //   } else if (pwRef.current.value == "") {
  //     // Check for refresh token to resume old session
  //     const refreshTkn = localStorage.getItem("GARef");
  //     if (refreshTkn) {
  //       const refreshDecoded = jwtDecode(refreshTkn);
  //       // Check expiry and that token belongs to specified email
  //       if (
  //         new Date(refreshDecoded.exp * 1000) - new Date() > 0 &&
  //         refreshDecoded.email == emailRef.current.value
  //       ) {
  //         // Get new access token
  //         navigate("/admin/dashboard");
  //         alert(`Resuming session for user: ${refreshDecoded.name}`);
  //       }
  //     } else {
  //       alert("Please enter password!");
  //       return pwRef.current.focus();
  //     }
  //   }
  // }

  return (
    <>
      <img
        src="/GA_banner_horizontal_black.png"
        alt="GA banner"
        className={styles.banner}
      />
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">GA Email: </label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            required
            placeholder="user@generalassemb.ly"
            pattern=".+@generalassemb\.ly"
            title="General Assembly email (@generalassemb.ly)"
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            ref={pwRef}
            required
            placeholder="password"
          />
        </div>
        <input type="submit" value="Log in" />
      </form>
      <hr />
      <div className={styles.register_prompt}>
        Require access? Please <Link to="/admin/register">register</Link> and
        inform an admin.
      </div>
    </>
  );
}

export default AdminLoginPage;
