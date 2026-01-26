import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="page">
      <h1 className="page__title">Welcome to FamilyConnect 👨‍👩‍👧‍👦</h1>
      <p className="muted">
        Share updates, events, and special moments with your family and community.
        Create posts, announce events, and stay connected all in one place.
      </p>

      <div className="cardbox">
        <h3>Get Started</h3>
        <ul className="list">
          <li>View all posts and events</li>
          <li>Create a new post to share updates</li>
          <li>Announce a family or community event</li>
          <li>Edit or delete your existing posts</li>
        </ul>

        <div className="actions">
          <Link className="btn btn--primary" to="/posts">
            View Posts & Events
          </Link>
          <Link className="btn btn--secondary" to="/posts/new">
            Add Post or Event
          </Link>
        </div>

        <p className="tip">
          💡 Tip: Use the "Record Type" dropdown when adding a post to choose between a general post or an event.
        </p>
      </div>
    </section>
  );
}
