import React from "react";
import CourseForm from "./components/CourseForm";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./pages_css/AdminEditPage.module.css";
import { getDaysNum } from "../helpers/common";

function AdminEditPage() {
  const { name } = useParams();
  const { course } = useLocation().state;
  const navigate = useNavigate();

  return (
    <div>
      <h2 className={styles.title}>Editing {name}</h2>
      <hr />
      <CourseForm
        course={course}
        days={getDaysNum(course.schedule)}
        submission_method={"PATCH"}
      />
      <button onClick={() => navigate(-1)}>Return</button>
    </div>
  );
}

export default AdminEditPage;
