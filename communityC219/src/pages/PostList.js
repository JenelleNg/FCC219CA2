import { useEffect, useState } from "react";
import Post from "../components/Post";
import { getPosts, deletePost } from "../services/api";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError("");

      try {
        const data = await getPosts();
        // Optional: sort events first, then by newest
        data.sort((a, b) => {
          if (a.record_type === "event" && b.record_type !== "event") return -1;
          if (a.record_type !== "event" && b.record_type === "event") return 1;
          return b.id - a.id; // newest first
        });
        setPosts(data);
      } catch {
        setError("Failed to load posts");
      }

      setLoading(false);
    }

    fetchPosts();
  }, []);

  async function handleDelete(post) {
    setBusy(true);
    setError("");

    try {
      await deletePost(post.id);
      setPosts(posts.filter(c => c.id !== post.id));
    } catch {
      setError("Failed to delete post");
    }

    setBusy(false);
  }

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <main>
      <div className="post-grid">
        {posts.length === 0 && <p>No posts or events yet.</p>}
        {posts.map(post => (
          <Post
            key={post.id}
            post={post}
            onDelete={handleDelete}
            busy={busy}
          />
        ))}
      </div>
    </main>
  );
}

// import { useEffect, useState } from "react";
// import Card from "../components/Card";
// import { deleteCard, getCards } from "../services/api";

// export default function CardList() {
//   const [cards, setCards] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [busy, setBusy] = useState(false);
//   const [error, setError] = useState("");

//   async function load() {
//     setLoading(true);
//     setError("");
//     try {
//       const data = await getCards();
//       setCards(data);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load cards.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     load();
//   }, []);

//   async function handleDelete(card) {
//     const ok = window.confirm(`Delete "${card.card_name}"?`);
//     if (!ok) return;

//     setBusy(true);
//     setError("");
//     try {
//       const res = await deleteCard(card.id);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       // Optimistic update:
//       setCards((prev) => prev.filter((c) => c.id !== card.id));
//     } catch (err) {
//       console.error(err);
//       setError("Failed to delete card.");
//     } finally {
//       setBusy(false);
//     }
//   }

//   return (
//     <section className="page">
//       <div className="page__header">
//         <h2 className="page__title">All Cards</h2>
//         <button className="btn btn--ghost" onClick={load} disabled={busy}>
//           Refresh
//         </button>
//       </div>

//       {error ? <div className="alert alert--error">{error}</div> : null}

//       {loading ? (
//         <div className="muted">Loading…</div>
//       ) : cards.length === 0 ? (
//         <div className="muted">No cards yet. Add your first card!</div>
//       ) : (
//         <div className="grid">
//           {cards.map((card) => (
//             <Card
//               key={card.id}
//               card={card}
//               onDelete={handleDelete}
//               disabled={busy}
//             />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }
