import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import { CreatePost } from "../services/api";

export default function CreatePost() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ record_type: "", title: "", details: "", pic: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, [navigate]);

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");

    try {
      const username = "admin"; // fixed demo user
      const res = await CreatePost({ ...values, username });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      navigate("/posts"); // redirect to posts
    } catch (err) {
      console.error(err);
      setError("Failed to add post");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main>
      <h2>Create Post</h2>
      <PostForm
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        busy={busy}
        error={error}
        submitText="Create Post"
      />
    </main>
  );
}
