<!-- models/userModel.js -->
<script type="module">
import bcrypt from 'bcryptjs'

// ここにユーザーデータを直接追加する。
// 新しいユーザーを追加したければ、下の配列にオブジェクトを追加してからサーバー再起動する。
// パスワードはハッシュ済みで格納されるようにしてある（hashSyncで初期化）

export const users = [
  {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    password: bcrypt.hashSync('password123', 10) // 直接編集するならプレーンテキスト -> hashSync でハッシュ化
  },
  {
    id: 2,
    username: 'alice',
    email: 'alice@example.com',
    password: bcrypt.hashSync('alicepass', 10)
  }
]

// 追加例（コメント）:
// users.push({ id: 3, username: 'bob', email: 'bob@example.com', password: bcrypt.hashSync('bobpass', 10) })
</script>
