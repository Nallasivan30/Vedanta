import { View, Text, StyleSheet } from "react-native";

export default function OTPVerification() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>It's really You?</Text>
      {/* Add OTP input and resend code logic */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
