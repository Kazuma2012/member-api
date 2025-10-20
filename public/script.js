const API_BASE = "https://あなたの-render-url/api"

async function register() {
  const username = document.getElementById("regUsername").value
  const email = document.getElementById("regEmail").value
  const password = document.getElementById("regPassword").value

  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  })
  const data = await res.json()
  document.getElementById("message").innerText = data.message
}

async function login() {
  const email = document.getElementById("loginEmail").value
  const password = document.getElementById("loginPassword").value

  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  const data = await res.json()
  if (res.ok) {
    localStorage.setItem("token", data.token)
    window.location.href = "profile.html"
  } else {
    document.getElementById("message").innerText = data.message
  }
}

async function loadProfile() {
  const token = localStorage.getItem("token")
  if (!token) return (window.location.href = "index.html")

  const res = await fetch(`${API_BASE}/users/1`, { headers: { Authorization: `Bearer ${token}` } })
  const data = await res.json()
  document.getElementById("info").innerHTML = `<p>名前：${data.username}</p><p>メール：${data.email}</p>`
}

function logout() {
  localStorage.removeItem("token")
  window.location.href = "index.html"
}

if (document.getElementById("info")) loadProfile()
