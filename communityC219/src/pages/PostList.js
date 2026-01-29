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