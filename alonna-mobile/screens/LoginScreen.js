import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native"
import * as SecureStore from "expo-secure-store"
import { login } from "../services/api"

export default function LoginScreen({ navigation }) {
  const [ue, setUe] = useState("") // username or email
  const [pw, setPw] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    if (!ue || !pw) {
      Alert.alert(
        "Missing info",
        "Please enter your username/email and password."
      )
      return
    }
    try {
      setLoading(true)
      const res = await login(ue, pw)
      await SecureStore.setItemAsync("alonna_token", res.token)
      await SecureStore.setItemAsync("alonna_user", JSON.stringify(res.user))
      navigation.replace("Main", { user: res.user })
    } catch (err) {
      Alert.alert("Login failed", "Invalid credentials.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.root}>
      <Text style={styles.brand}>Alonna</Text>
      <View style={styles.card}>
        <Text style={styles.title}>Sign in</Text>
        <TextInput
          style={styles.input}
          placeholder="Username or Email"
          autoCapitalize="none"
          value={ue}
          onChangeText={setUe}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={pw}
          onChangeText={setPw}
        />

        <Pressable style={styles.button} onPress={onSubmit} disabled={loading}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
        </Pressable>
      </View>
      <Text style={styles.footer}>© {new Date().getFullYear()} Alonna</Text>
    </View>
  )
}

const PURPLE = "#6E44FF"
const LAVENDER = "#EFE7FF"
const DARK = "#1B1038"

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: LAVENDER,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  brand: {
    position: "absolute",
    top: 80,
    fontSize: 36,
    fontWeight: "800",
    color: DARK,
    letterSpacing: 1,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    elevation: 6,
    shadowColor: PURPLE,
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: DARK,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: "#FAFAFF",
  },
  button: {
    backgroundColor: PURPLE,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.4,
  },
  footer: {
    position: "absolute",
    bottom: 24,
    color: DARK,
    opacity: 0.6,
  },
})
