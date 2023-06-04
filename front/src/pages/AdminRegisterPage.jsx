import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./pages_css/AdminLoginPage.module.css";
import { fetchData } from "../helpers/common";

function AdminRegisterPage() {
  const nameRef = useRef();
  const emailRef = useRef();
  const pwRef = useRef();
  const navigate = useNavigate();

  async function handleRegister(event) {
    event.preventDefault();
    if (nameRef.current.value == "") {
      alert("Please enter name!");
      return nameRef.current.focus();
    } else if (emailRef.current.value == "") {
      alert("Please enter email!");
      return emailRef.current.focus();
    } else if (pwRef.current.value == "") {
      alert("Please enter password!");
      return pwRef.current.focus();
    }
    try {
      const { ok, data } = await fetchData(
        "/auth/register",
        undefined,
        "POST",
        {
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: pwRef.current.value,
        }
      );
      if (ok) {
        alert(
          "Account registered! Please inform an admin to activate your accoutn!"
        );
        navigate("/admin");
      } else {
        throw new Error(data);
      }
    } catch (error) {
      console.log(error.message);
      alert("Error registering, please try again or contact an administrator!");
    }
  }

  return (
    <>
      <div className={styles.banner}>
        <img src="/GA_banner_horizontal_black.png" alt="GA banner" />
      </div>
      <form onSubmit={handleRegister}>
        <div className={styles.input_grid}>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            ref={nameRef}
            required
            placeholder="name"
          />
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
          <input type="submit" className={styles.button} value="Register" />
        </div>
      </form>
      <hr />
      <div className={styles.register_prompt}>
        After registration, please remember to inform an Admin to activate your
        account.
      </div>
    </>
  );
}

export default AdminRegisterPage;
