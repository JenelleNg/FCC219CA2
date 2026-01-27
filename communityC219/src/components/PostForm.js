export default function PostForm({
  values,
  onChange,
  onSubmit,
  busy,
  error,
  submitText
}) {
  return (
    <form onSubmit={onSubmit} className="form">
      <div className="field">
        <label className="label">Record Type</label>
        <select
          className="input"
          name="record_type"
          value={values.record_type}
          onChange={onChange}
          required
        >
          <option value="">-- Select Type --</option>
          <option value="post">Post</option>
          <option value="event">Event</option>
        </select>
      </div>

      <div className="field">
        <label className="label">Title</label>
        <input
          className="input"
          name="title"
          value={values.title}
          onChange={onChange}
          required
        />
      </div>

      <div className="field">
        <label className="label">Image URL (optional)</label>
        <input
          className="input"
          name="pic"
          value={values.pic}
          onChange={onChange}
        />
      </div>

      <div className="field">
        <label className="label">Details</label>
        <textarea
          className="input"
          name="details"
          value={values.details}
          onChange={onChange}
          required
        />
      </div>

      {error && <p className="alert alert--error">{error}</p>}

      <button className="btn btn--primary" disabled={busy}>
        {submitText}
      </button>
    </form>
  );
}
