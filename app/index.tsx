import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import { MissionContext } from '../context/MissionContext';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Dashboard() {
  const { missao } = useContext(MissionContext);

  useEffect(() => {
    if (Number(missao.energia) < 20) Alert.alert('⚠️ ALERTA CRÍTICO', 'Energia baixa!');
  }, [missao]);

  // Transformamos os dados em um array para o FlatList (Melhor uso de espaço)
  const stats = [
    { id: '1', label: 'Energia', value: `${missao.energia}%`, critical: Number(missao.energia) < 20 },
    { id: '2', label: 'Estabilidade', value: `${missao.estabilidade}%`, critical: Number(missao.estabilidade) < 30 },
    { id: '3', label: 'Comunicação', value: missao.comunicacao, critical: false },
    { id: '4', label: 'Sensores', value: missao.sensores, critical: false },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.headerTitle}>SISTEMA ALPHA MONITORING</Text>
     
      <FlatList
        data={stats}
        numColumns={2} // <--- ISSO CRIA O GRID DE DASHBOARD
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardLabel}>{item.label}</Text>
            <Text style={[styles.cardValue, item.critical && styles.dangerText]}>
              {item.value}
            </Text>
            <View style={[styles.statusIndicator, { backgroundColor: item.critical ? '#FF3B30' : '#00D4FF' }]} />
          </View>
        )}
      />

      <TouchableOpacity style={styles.mainButton} onPress={() => router.push('/controle')}>
        <Text style={styles.mainButtonText}>TERMINAL DE COMANDO</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', padding: 15 },
  headerTitle: { color: '#00D4FF', fontSize: 20, fontWeight: 'bold', letterSpacing: 2, textAlign: 'center', marginVertical: 20 },
  card: {
    flex: 1,
    backgroundColor: '#0F172A',
    margin: 8,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
    height: 140,
    justifyContent: 'center'
  },
  cardLabel: { color: '#94A3B8', fontSize: 16, textTransform: 'uppercase' },
  cardValue: { color: '#F8FAFC', fontSize: 25, fontWeight: 'bold', marginTop: 10 },
  dangerText: { color: '#FF3B30' },
  statusIndicator: { height: 3, width: '40%', marginTop: 15, borderRadius: 2 },
  mainButton: { backgroundColor: '#00D4FF', padding: 18, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  mainButtonText: { color: '#020617', fontWeight: 'bold', letterSpacing: 1 }
});