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


// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import CardForm from "../components/CardForm";
// import { getCards, updateCard } from "../services/api";

// export default function EditCard() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [busy, setBusy] = useState(false);
//   const [error, setError] = useState("");
//   const [values, setValues] = useState({ card_name: "", card_pic: "" });

//   useEffect(() => {
//     async function loadCard() {
//       setLoading(true);
//       setError("");

//       try {
//         const cards = await getCards();
//         const card = cards.find((c) => String(c.id) === String(id));

//         if (!card) {
//           throw new Error("Card not found");
//         }

//         setValues({
//           card_name: card.card_name,
//           card_pic: card.card_pic,
//         });
//       } catch (err) {
//         console.error(err);
//         setError("Card not found or failed to load.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadCard();
//   }, [id]);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setBusy(true);
//     setError("");
//     try {
//       const res = await updateCard(id, values);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       navigate("/cards");
//     } catch (err) {
//       console.error(err);
//       setError("Failed to update card.");
//     } finally {
//       setBusy(false);
//     }
//   }

//   return (
//     <section className="page">
//       <h2 className="page__title">Edit Card</h2>

//       {loading ? (
//         <div className="muted">Loading…</div>
//       ) : (
//         <div className="cardbox">
//           <CardForm
//             mode="edit"
//             values={values}
//             onChange={setValues}
//             onSubmit={handleSubmit}
//             busy={busy}
//             error={error}
//             submitText="Save Changes"
//           />
//         </div>
//       )}
//     </section>
//   );
// }
