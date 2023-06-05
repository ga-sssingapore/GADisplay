import React, { useContext, useState } from "react";
import CourseForm from "./components/CourseForm";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./pages_css/AdminEditPage.module.css";
import { fetchData, getDaysNum } from "../helpers/common";
import UserContext from "../context/user";

function AdminEditPage() {
  const userCtx = useContext(UserContext);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { name } = useParams();
  const { course } = useLocation().state;
  const navigate = useNavigate();

  async function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
    } else {
      try {
        const { ok, data } = await fetchData(
          "/cohorts/delete",
          userCtx.accessToken,
          "DELETE",
          {
            name,
          }
        );
        if (ok) {
          alert("Cohort deleted!");
          navigate("/admin/courses");
        } else {
          throw new Error(data);
        }
      } catch (error) {
        console.log(error.message);
        alert("Error deleting cohort");
      }
    }
  }

  return (
    <div onClick={() => setConfirmDelete(false)}>
      <h2 className={styles.title}>Editing {name}</h2>
      <hr />
      <CourseForm
        course={course}
        days={getDaysNum(course.schedule)}
        submission_method={"PATCH"}
      />
      <button
        className={`${styles.button} ${styles.delete_button}`}
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
      >
        Delete
      </button>
      {confirmDelete && (
        <div className={styles.warning_text}>
          Click delete again to confirm deletion. <br />
          Click elsewhere to cancel.
        </div>
      )}
      <br />
      <button
        className={`${styles.button} ${styles.return_button}`}
        onClick={() => navigate(-1)}
      >
        Return
      </button>
    </div>
  );
}

export default AdminEditPage;
