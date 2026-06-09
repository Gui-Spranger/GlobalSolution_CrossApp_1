import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#0B0D17", padding: 20 },
    scrollContent: { flexGrow: 1 }, header: { marginBottom: 20 },
    secao: { backgroundColor: "#111827", padding: 20, borderRadius: 8, marginBottom: 20, borderWidth: 1, borderColor: "#1F2937" },
    titulo: {
        fontSize: 22, fontWeight: "bold", color: "#00D4FF", marginBottom: 15
    },
    subtitulo: { fontSize: 16, color: "#A1A1AA" },
    input: { backgroundColor: "#1F2937", borderWidth: 1, borderColor: "#374151", borderRadius: 8, padding: 12, marginBottom: 15, fontSize: 16, color: "#fff" },
    item: { fontSize: 16, color: "#fff", marginBottom: 8 },
    danger: { color: "#FF3B30", fontWeight: "bold" }
});


