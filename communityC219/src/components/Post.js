import { Link } from "react-router-dom";

export default function Post({ post, onDelete, busy }) {
  return (
    <div className="post">
      {/* Header */}
      <div className="post__body">
        <h3 className="post__title">{post.title}</h3>

        <span
          className={
            post.record_type === "event"
              ? "badge badge--event"
              : "badge badge--post"
          }
        >
          {post.record_type}
        </span>
      </div>

      {/* Image */}
      {post.pic && (
        <div className="post__imgWrap">
          <img src={post.pic} alt={post.title} className="post__img" />
        </div>
      )}

      {/* Body */}
      <div className="post__body">
        <p className="muted small">{post.details}</p>

        <div className="actions actions--tight">
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
