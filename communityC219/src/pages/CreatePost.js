import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import { CreatePost } from "../services/api";

export default function CreatePostPage() {
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
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");

    try {
      await CreatePost({
        record_type: values.record_type,
        username: localStorage.getItem("username") || "Guest",
        title: values.title,
        details: values.details,
        pic: values.pic || null
      });
      navigate("/posts");
    } catch {
      setError("Failed to add post");
    }

    setBusy(false);
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


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import CardForm from "../components/CardForm";
// import { addCard } from "../services/api";

// export default function AddCard() {
//   const navigate = useNavigate();
//   const [busy, setBusy] = useState(false);
//   const [error, setError] = useState("");
//   const [values, setValues] = useState({ card_name: "", card_pic: "" });

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) navigate("/login");
//   }, [navigate]);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");
//     setBusy(true);

//     try {
//       const res = await addCard(values);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       navigate("/cards");
//     } catch (err) {
//       console.error(err);
//       setError("Failed to add card. Check API / network.");
//     } finally {
//       setBusy(false);
//     }
//   }

//   return (
//     <section className="page">
//       <h2 className="page__title">Add a New Card</h2>
//       <div className="cardbox">
//         <CardForm
//           mode="create"
//           values={values}
//           onChange={setValues}
//           onSubmit={handleSubmit}
//           busy={busy}
//           error={error}
//           submitText="Add Card"
//         />
//       </div>
//     </section>
//   );
// }
