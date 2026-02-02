import { useEffect, useMemo, useState } from "react";
import Post from "../components/Post";
import { getPosts, deletePost } from "../services/api";

function getUserKey() {
  const username = localStorage.getItem("username");
  return username ? `likedPostIds_${username}` : "likedPostIds_guest";
}

function loadLikedIds(userKey) {
  try {
    const raw = localStorage.getItem(userKey);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.map(Number) : [];
  } catch {
    return [];
  }
}

function saveLikedIds(userKey, ids) {
  localStorage.setItem(userKey, JSON.stringify(ids));
}

function loadLikesMap() {
  try {
    const raw = localStorage.getItem("likesMap");
    const obj = raw ? JSON.parse(raw) : {};
    return obj && typeof obj === "object" ? obj : {};
  } catch {
    return {};
  }
}

function saveLikesMap(map) {
  localStorage.setItem("likesMap", JSON.stringify(map));
}

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const userKey = useMemo(() => getUserKey(), []);
  const [likedIds, setLikedIds] = useState(() => loadLikedIds(userKey));

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts();
        const likesMap = loadLikesMap();

        setPosts(
          data.map((p) => {
            const id = Number(p.id);
            const likes = Number(likesMap[id] || 0);
            return { ...p, id, likes };
          })
        );
      } catch {
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  async function handleDelete(post) {
    setBusy(true);
    try {
      await deletePost(post.id);

      setPosts((prev) => prev.filter((p) => p.id !== post.id));

      setLikedIds((prev) => {
        const next = prev.filter((id) => id !== post.id);
        saveLikedIds(userKey, next);
        return next;
      });

      const likesMap = loadLikesMap();
      delete likesMap[post.id];
      saveLikesMap(likesMap);
    } catch {
      setError("Failed to delete post");
    } finally {
      setBusy(false);
    }
  }

  function handleToggleLike(post) {
    const postId = Number(post.id);
    const alreadyLiked = likedIds.includes(postId);

    const nextLikes = alreadyLiked ? (post.likes || 0) - 1 : (post.likes || 0) + 1;
    const likesSafe = Math.max(0, nextLikes);

    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes: likesSafe } : p))
    );

    setLikedIds((prev) => {
      const next = alreadyLiked
        ? prev.filter((id) => id !== postId)
        : [...prev, postId];

      saveLikedIds(userKey, next);
      return next;
    });

    const likesMap = loadLikesMap();
    likesMap[postId] = likesSafe;
    saveLikesMap(likesMap);
  }

  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      (p.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.details || "").toLowerCase().includes(search.toLowerCase());

    const matchesType = filterType === "all" || p.record_type === filterType;

    return matchesSearch && matchesType;
  });

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <main>
      <div className="actions actions--tight" style={{ marginBottom: "16px" }}>
        <input
          className="input"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1 }}
        />

        <select
          className="input"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{ width: "160px" }}
        >
          <option value="all">All</option>
          <option value="post">Posts</option>
          <option value="event">Events</option>
        </select>
      </div>

      <div className="post-grid">
        {filteredPosts.length === 0 && <p>No posts found.</p>}
        {filteredPosts.map((post) => (
          <Post
            key={post.id}
            post={post}
            onDelete={handleDelete}
            onToggleLike={handleToggleLike}
            busy={busy}
            isLiked={likedIds.includes(Number(post.id))}
          />
        ))}
      </div>
    </main>
  );
}