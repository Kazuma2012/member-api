import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import { users } from '../models/userModel.js'

const sanitize = (u) => ({ id: u.id, username: u.username, email: u.email })

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body
    if (!username || !email || !password) return res.status(400).json({ message: '必須項目が足りない' })

    const existing = users.find(u => u.email === email)
    if (existing) return res.status(400).json({ message: '既に登録済みのメール' })

    const hashed = await bcrypt.hash(password, 10)
    const newUser = { id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1, username, email, password: hashed }
    users.push(newUser)
    return res.status(201).json({ message: '登録成功', user: sanitize(newUser) })
  } catch {
    return res.status(500).json({ message: 'サーバーエラー' })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: '必須項目が足りない' })

    const user = users.find(u => u.email === email)
    if (!user) return res.status(400).json({ message: 'ユーザーが存在しない' })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(400).json({ message: 'パスワードが違う' })

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' })
    return res.json({ message: 'ログイン成功', token })
  } catch {
    return res.status(500).json({ message: 'サーバーエラー' })
  }
}

export const getUser = (req, res) => {
  const id = parseInt(req.params.id)
  if (req.userId !== id) return res.status(403).json({ message: '他人の情報にはアクセスできない' })

  const user = users.find(u => u.id === id)
  if (!user) return res.status(404).json({ message: 'ユーザーが見つからない' })
  return res.json(sanitize(user))
}

export const updateUser = async (req, res) => {
  const id = parseInt(req.params.id)
  if (req.userId !== id) return res.status(403).json({ message: '他人の操作はできない' })

  const user = users.find(u => u.id === id)
  if (!user) return res.status(404).json({ message: 'ユーザーが見つからない' })

  const { username, email, password } = req.body
  if (username) user.username = username
  if (email) user.email = email
  if (password) user.password = await bcrypt.hash(password, 10)

  return res.json({ message: '更新成功', user: sanitize(user) })
}

export const deleteUser = (req, res) => {
  const id = parseInt(req.params.id)
  if (req.userId !== id) return res.status(403).json({ message: '他人の操作はできない' })

  const idx = users.findIndex(u => u.id === id)
  if (idx === -1) return res.status(404).json({ message: 'ユーザーが見つからない' })

  users.splice(idx, 1)
  return res.json({ message: '削除成功' })
}
