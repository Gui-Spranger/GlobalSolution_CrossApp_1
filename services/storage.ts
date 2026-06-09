import AsyncStorage from "@react-native-async-storage/async-storage";
import { Missao } from "../interfaces/missao";
const KEYS = { MISSAO: "@missao:dados" };

export async function salvarMissao(dados: Missao) {
    try {
        await AsyncStorage.setItem(KEYS.MISSAO, JSON.stringify(dados));

    } catch (erro) {
        console.error("Erro ao salvar dados no AsyncStorage:", erro);
    }
}

export async function obterMissao(): Promise<Missao | null> {
    try {
        const dados = await AsyncStorage.getItem(KEYS.MISSAO);
        return dados ? JSON.parse(dados) : null;
    } catch (erro) {
        console.error("Erro ao obter dados do AsyncStorage:", erro);
        return null;
    }
}