import { Link } from "react-router-dom";

export default function Post({ post, onDelete, onLike, busy, isLiked }) {
  return (
    <div className={post.pic ? "post has-image" : "post no-image"}>
      <div className="post__header">
        <div>
          <h3 className="post__title">{post.title}</h3>
          <p>by {post.username}</p>
        </div>

        <span
          className={
            post.record_type === "event"
              ? "badge badge--event"
              : "badge badge--post"
          }
        >
          {post.record_type.toUpperCase()}
        </span>
      </div>

      {post.pic && (
        <div>
          <img src={post.pic} alt={post.title} className="post__img" />
        </div>
      )}

      <div className="post__body">
        <p className="muted small">{post.details}</p>

        <div className="actions">
          <button
            className="btn btn--ghost"
            disabled={busy || isLiked}
            onClick={() => onLike(post)}
            title={isLiked ? "You can only like once" : "Like"}
          >
            {isLiked ? "✅ Liked" : "❤️"} {post.likes || 0}
          </button>

          <Link to={`/posts/${post.id}/edit`} className="btn btn--ghost">
            Edit
          </Link>

          <button
            className="btn btn--danger"
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
    </div>
  );
}

