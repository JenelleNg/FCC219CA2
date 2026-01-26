const API_URL = process.env.REACT_APP_API_URL || "";

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function login(credentials) {
  return fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
}

export async function getPosts() {
  const res = await fetch(`${API_URL}/allposts`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function CreatePost(post) {
  return fetch(`${API_URL}/createpost`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(post),
  });
}

export function editPost(id, post) {
  return fetch(`${API_URL}/editpost/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
}

export function deletePost(id) {
  return fetch(`${API_URL}/deletepost/${id}`, { method: "DELETE" });
}
