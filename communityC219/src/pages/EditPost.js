import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/PostForm";
import { editPost, getPosts } from "../services/api";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    record_type: "",
    title: "",
    details: "",
    pic: ""
  });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // 🔒 Authentication check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // redirect to login if not authenticated
    }
  }, [navigate]);

  useEffect(() => {
    async function loadPost() {
      try {
        const posts = await getPosts();
        const post = posts.find(c => c.id === Number(id));
        if (!post) {
          setError("Post not found");
        } else {
          setValues({
            record_type: post.record_type || "",
            title: post.title || "",
            details: post.details || "",
            pic: post.pic || ""
          });
        }
      } catch {
        setError("Failed to load post");
      }
      setLoading(false);
    }
    loadPost();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");

    const token = localStorage.getItem("token"); // 🔒 include token in request

    if (!token) {
      setBusy(false);
      navigate("/login");
      return;
    }

    try {
      await editPost(id, {
        record_type: values.record_type,
        title: values.title,
        details: values.details,
        pic: values.pic || null,
        token, // send token to API for verification if backend requires it
      });
      navigate("/posts");
    } catch {
      setError("Failed to update post");
    }

    setBusy(false);
  }
  if (loading) return <p>Loading post...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <h2>Edit Post</h2>
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
