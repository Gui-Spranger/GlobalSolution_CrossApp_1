import { Stack } from "expo-router";
import { MissionProvider } from "../context/MissionContext";

export default function RootLayout() {
    return(
        <MissionProvider>
            <Stack
                screenOptions={{
                    headerStyle: {backgroundColor: "#0B0D17"},
                    headerTintColor: "#fff",
                    headerTitleStyle: {fontWeight: "bold"},
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{title: "Painel Espacial"}}
                    />
                <Stack.Screen
                    name="controle"
                    options={{title: "Terminal de Comando"}}
                    />
            </Stack>
            </MissionProvider>
    );
}