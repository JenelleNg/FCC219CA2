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
    pic: "",
    likes: 0
  });

  // 🔒 Authentication check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // redirect to login if not authenticated
    }
  }, [navigate]);

  useEffect(() => {
    async function loadPost() {
      const posts = await getPosts();
      const post = posts.find(p => p.id === Number(id));
      if (post) setValues(post);
    }
    loadPost();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    await editPost(id, values);
    navigate("/posts");
  }

  return (
    <main>
      <h2>Edit Post</h2>
      <PostForm
        values={values}
        onChange={e => setValues({ ...values, [e.target.name]: e.target.value })}
        onSubmit={handleSubmit}
        submitText="Update Post"
      />
    </main>
  );
}
