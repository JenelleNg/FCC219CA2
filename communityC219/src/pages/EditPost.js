import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/PostForm";
import { editPost, getPosts } from "../services/api";

export default function EditPost({ setPosts }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    record_type: "",
    title: "",
    details: "",
    pic: "",
    likes: 0
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    async function loadPost() {
      try {
        const posts = await getPosts();
        const post = posts.find(p => p.id === Number(id));
        if (post) setValues(post);
      } catch (err) {
        console.error(err);
        setError("Failed to load post");
      }
    }
    loadPost();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");

    try {
      const cleanedValues = { ...values, pic: values.pic.trim() };
      const updatedPost = await editPost(id, cleanedValues);

      if (setPosts) {
        setPosts(prevPosts =>
          prevPosts.map(p => (p.id === id ? updatedPost : p))
        );
      }

      navigate("/posts");
    } catch (err) {
      console.error(err);
      setError("Failed to update post");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main style={{ maxWidth: "420px", margin: "0 auto", padding: "18px" }}>
      <h2 style={{ marginBottom: "18px" }}>Edit Post</h2>
      <PostForm
        values={values}
        onChange={e => setValues({ ...values, [e.target.name]: e.target.value })}
        onSubmit={handleSubmit}
        busy={busy}
        error={error}
        submitText="Update Post"
      />
    </main>
  );
}
