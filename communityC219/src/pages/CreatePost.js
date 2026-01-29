import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import { createPost } from "../services/api";

export default function CreatePost({ setPosts }) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    record_type: "",
    title: "",
    details: "",
    pic: ""
  });
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
      const username = "admin";

      // Trim pic URL to avoid hidden spaces
      const cleanedValues = { ...values, username, pic: values.pic.trim() };

      // Create post
      const newPost = await createPost(cleanedValues);

      // Update parent state so the post shows immediately
      if (setPosts) {
        setPosts(prev => [newPost, ...prev]);
      }

      // Reset form for next post
      setValues({ record_type: "", title: "", details: "", pic: "" });

      navigate("/posts"); // optional, redirect to posts page
    } catch (err) {
      console.error(err);
      setError("Failed to add post");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main style={{ maxWidth: "420px", margin: "0 auto", padding: "18px" }}>
      <h2 style={{ marginBottom: "18px" }}>Create Post</h2>
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
