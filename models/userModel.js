import bcrypt from 'bcryptjs'

export const users = [
  {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    password: bcrypt.hashSync('password123', 10)
  },
  {
    id: 2,
    username: 'alice',
    email: 'alice@example.com',
    password: bcrypt.hashSync('alicepass', 10)
  }
]

// 追加例:
// users.push({ id: 3, username: 'bob', email: 'bob@example.com', password: bcrypt.hashSync('bobpass', 10) })
