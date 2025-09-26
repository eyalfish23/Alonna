import React from "react"
import { View, Text, StyleSheet } from "react-native"

export default function MainScreen({ route }) {
  const user = route.params?.user
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Main</Text>
      <Text style={styles.subtitle}>
        {user?.displayName
          ? `Welcome, ${user.displayName}!`
          : "You are signed in."}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  title: { fontSize: 28, fontWeight: "800", color: "#6E44FF" },
  subtitle: { marginTop: 10, fontSize: 16, color: "#333" },
})
