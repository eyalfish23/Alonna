import React, { useState } from "react"
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native"
import { login } from "./services/api"

export default function App() {
  const [username, setUsername] = useState("eyalfish")
  const [password, setPassword] = useState("Admin123!")
  const [loading, setLoading] = useState(false)
  const [okMsg, setOkMsg] = useState(null)
  const [errMsg, setErrMsg] = useState(null)

  const onSubmit = async () => {
    setLoading(true)
    setOkMsg(null)
    setErrMsg(null)
    try {
      const res = await login(username.trim(), password)
      setOkMsg(`Welcome ${res.displayName || res.username}!`)
    } catch (e) {
      setErrMsg(e?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign in</Text>

        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={onSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        {okMsg ? <Text style={styles.ok}>{okMsg}</Text> : null}
        {errMsg ? <Text style={styles.err}>{errMsg}</Text> : null}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f6f6",
  },
  card: {
    width: "90%",
    maxWidth: 420,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  title: { fontSize: 22, fontWeight: "600", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#111827",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: "white", fontWeight: "600" },
  ok: { marginTop: 12, color: "green" },
  err: { marginTop: 12, color: "crimson" },
})
