import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, ScrollView, Alert } from "react-native";
// IMPORTANTE: Mudamos o import para usar o objeto router global direto do expo-router
import { router } from "expo-router";
import { MissionContext } from "../context/MissionContext";
import { styles } from "../styles/app.styles";

export default function Controle() {
  const { missao, atualizarMissao } = useContext(MissionContext);

  // Estados locais para gerenciar o formulário
  const [energia, setEnergia] = useState(missao.energia);
  const [estabilidade, setEstabilidade] = useState(missao.estabilidade);

  async function salvarAlteracoes() {
    try {
      // 1. Força a conversão para String e limpa espaços vazios
      const valEnergia = String(energia).trim();
      const valEstabilidade = String(estabilidade).trim();

      // 2. Validações básicas de preenchimento obrigatorio (Igual ao seu laboratório)
      if (!valEnergia || !valEstabilidade) {
        Alert.alert("Erro de Entrada", "Todos os campos numéricos são obrigatórios.");
        return;
      }

      const nEnergia = Number(valEnergia);
      const nEstabilidade = Number(valEstabilidade);

      // 3. Validações de limites (0 a 100)
      if (isNaN(nEnergia) || nEnergia < 0 || nEnergia > 100) {
        Alert.alert("Validação Falhou", "A energia deve ser um número entre 0 e 100.");
        return;
      }

      if (isNaN(nEstabilidade) || nEstabilidade < 0 || nEstabilidade > 100) {
        Alert.alert("Validação Falhou", "A estabilidade orbital deve ser um número entre 0 e 100.");
        return;
      }

      // 4. Grava os novos dados no Contexto e consequentemente no AsyncStorage
      await atualizarMissao({
        energia: valEnergia,
        estabilidade: valEstabilidade,
        comunicacao: missao.comunicacao,
        sensores: missao.sensores
      });

      // 5. Redirecionamento forçado para a raiz ("/") ignorando problemas de histórico
      router.replace("/");

    } catch (error) {
      console.error("Erro crítico ao salvar telemetria:", error);
      Alert.alert("Erro", "Não foi possível sincronizar os dados com o painel central.");
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.secao}>
          <Text style={styles.titulo}>Terminal de Comando </Text>
         
          <Text style={{ color: "#A1A1AA", marginBottom: 5 }}>Modificar Energia (%):</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 85"
            value={energia}
            onChangeText={setEnergia}
            keyboardType="numeric"
          />
         
          <Text style={{ color: "#A1A1AA", marginBottom: 5 }}>Modificar Estabilidade Orbital (%):</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 98"
            value={estabilidade}
            onChangeText={setEstabilidade}
            keyboardType="numeric"
          />
         
          <Button
            title="Sincronizar Dados de Telemetria"
            onPress={salvarAlteracoes}
            color="#00D4FF"
          />
        </View>
      </ScrollView>
    </View>
  );
}