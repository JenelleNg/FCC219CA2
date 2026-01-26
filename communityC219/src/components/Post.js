import { Link } from "react-router-dom";

export default function Post({ post, onDelete, busy }) {
  return (
    <div className="card">
      {post.pic && <img src={post.pic} alt={post.title} />}
      <h3>{post.title}</h3>
      <p>{post.details}</p>
      <p>ID: {post.id}</p>
      <p>Type: {post.record_type}</p>

      <div className="card-actions">
        <Link to={`/posts/${post.id}/edit`}>Edit</Link>
        <button
          disabled={busy}
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this post?")) {
              onDelete(post);
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
