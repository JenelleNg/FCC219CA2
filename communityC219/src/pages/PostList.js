import { useEffect, useState } from "react";
import Post from "../components/Post";
import { getPosts, deletePost, editPost } from "../services/api";

function getUserKey() {
  // username comes from login
  const username = localStorage.getItem("username");
  return username ? `likedPostIds_${username}` : "likedPostIds_guest";
}

function loadLikedIds(userKey) {
  try {
    const raw = localStorage.getItem(userKey);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveLikedIds(userKey, ids) {
  localStorage.setItem(userKey, JSON.stringify(ids));
}

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // ✅ Per-user likes
  const userKey = getUserKey();
  const [likedIds, setLikedIds] = useState(() => loadLikedIds(userKey));

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts();
        setPosts(
          data.map((p) => ({
            ...p,
            likes: p.likes || 0,
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
    setPosts(posts.filter((p) => p.id !== post.id));

    // remove deleted post from liked list
    const newLiked = likedIds.filter((id) => id !== post.id);
    setLikedIds(newLiked);
    saveLikedIds(userKey, newLiked);

    setBusy(false);
  }

  async function handleLike(post) {
    // ✅ Like once PER USER
    if (likedIds.includes(post.id)) return;

    const updated = { ...post, likes: post.likes + 1 };
    await editPost(post.id, updated);

    setPosts(posts.map((p) => (p.id === post.id ? updated : p)));

    const newLiked = [...likedIds, post.id];
    setLikedIds(newLiked);
    saveLikedIds(userKey, newLiked);
  }

  const filteredPosts = posts.filter(
    (p) =>
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
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "16px" }}
      />

      <div className="post-grid">
        {filteredPosts.length === 0 && <p>No posts found.</p>}
        {filteredPosts.map((post) => (
          <Post
            key={post.id}
            post={post}
            onDelete={handleDelete}
            onLike={handleLike}
            busy={busy}
            isLiked={likedIds.includes(post.id)} // ✅ per-user check
          />
        ))}
      </div>
    </main>
  );
}
