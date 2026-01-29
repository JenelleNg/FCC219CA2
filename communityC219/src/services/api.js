const API_URL = "https://c219ca2ws.onrender.com";

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
  const res = await fetch(`${API_URL}/allposts`, { headers: authHeaders() });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function createPost(post) {
  return fetch(`${API_URL}/createpost`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(post),
  });
}

export async function editPost(id, post) {
  const res = await fetch(`${API_URL}/editpost/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(post),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}


export function deletePost(id) {
  return fetch(`${API_URL}/deletepost/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
}
