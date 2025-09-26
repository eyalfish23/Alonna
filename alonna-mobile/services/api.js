// services/api.js
import { Platform } from "react-native"

// For Android emulator use 10.0.2.2 -> host machine; for iOS simulator use localhost.
// If you're testing on a real device, replace HOST with your PC's LAN IP (e.g. 192.168.1.23).
const HOST = Platform.OS === "android" ? "10.0.2.2" : "localhost"
const PORT = 5211

export const BASE_URL = `http://${HOST}:${PORT}`

export async function login(username, password) {
  const resp = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })

  let body = null
  try {
    body = await resp.json()
  } catch {
    /* ignore non-JSON */
  }

  if (!resp.ok) {
    const msg = body?.error || `Login failed (${resp.status})`
    throw new Error(msg)
  }
  return body // { id, username, displayName, email }
}
