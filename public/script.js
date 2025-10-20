<!-- public/script.js -->
<script>
const API_BASE = "https://あなたの-render-url/api" // ← Render URL やローカルだと http://localhost:5000/api に変更

async function register() {
  const username = document.getElementById('regUsername').value
  const email = document.getElementById('regEmail').value
  const password = document.getElementById('regPassword').value
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  })
  const data = await res.json()
  document.getElementById('message').innerText = data.message || JSON.stringify(data)
}

async function login() {
  const email = document.getElementById('loginEmail').value
  const password = document.getElementById('loginPassword').value
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  const data = await res.json()
  if (res.ok && data.token) {
    localStorage.setItem('token', data.token)
    // トークン内のidを読み取る処理を簡略化。ここでは profile.html でユーザーID=1 を使う想定。
    // 実運用では /api/me のようなエンドポイントを作り、サーバーからユーザー情報を取得するのがベスト
    window.location.href = 'profile.html'
  } else {
    document.getElementById('message').innerText = data.message || JSON.stringify(data)
  }
}

async function loadProfile() {
  const token = localStorage.getItem('token')
  if (!token) return window.location.href = 'index.html'

  // 簡易：ここではサンプルユーザーID=1 を取得（実運用なら /api/me を作る）
  const res = await fetch(`${API_BASE}/users/1`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  if (!res.ok) {
    localStorage.removeItem('token')
    return window.location.href = 'index.html'
  }
  const data = await res.json()
  document.getElementById('info').innerHTML = `<p>名前：${data.username}</p><p>メール：${data.email}</p>`
}

function logout() {
  localStorage.removeItem('token')
  window.location.href = 'index.html'
}

// profile.html に来たら loadProfile を実行
if (document.getElementById('info')) {
  loadProfile()
}
</script>
