import { useEffect, useState } from "react";
import Post from "../components/Post";
import { getPosts, deletePost, editPost } from "../services/api";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts();
        setPosts(
          data.map(p => ({
            ...p,
            likes: p.likes || 0
          }))
        );
      } catch {
        setError("Failed to load posts");
      }
      setLoading(false);
    }

    fetchPosts();
  }, []);

  async function handleDelete(post) {
    setBusy(true);
    await deletePost(post.id);
    setPosts(posts.filter(p => p.id !== post.id));
    setBusy(false);
  }

  async function handleLike(post) {
    const updated = { ...post, likes: post.likes + 1 };
    await editPost(post.id, updated);
    setPosts(posts.map(p => (p.id === post.id ? updated : p)));
  }

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.details.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <input
        className="input"
        placeholder="Search posts..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: "16px" }}
      />

      <div className="post-grid">
        {filteredPosts.length === 0 && <p>No posts found.</p>}
        {filteredPosts.map(post => (
          <Post
            key={post.id}
            post={post}
            onDelete={handleDelete}
            onLike={handleLike}
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
