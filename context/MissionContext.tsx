import React, { createContext, useState, useEffect } from "react";
import { Missao } from "../interfaces/missao";
import { obterMissao, salvarMissao } from "../services/storage";

type MissionContextData = {
    missao: Missao;
    atualizarMissao: (dados: Missao) => void;
};

export const MissionContext = createContext<MissionContextData>({} as MissionContextData);

export function MissionProvider({ children }: { children: React.ReactNode }) {
    const [missao, setMissao] = useState<Missao>({
        energia: "100",
        estabilidade: "100",
        comunicacao: "Estável",
        sensores: "Operantes",
    });
    useEffect(() => {
        carregarDadosIniciais();
    }, []);

    async function carregarDadosIniciais() {
        const dadosSalvos = await obterMissao();
        if (dadosSalvos) {
            setMissao(dadosSalvos);

        }
    }
    async function atualizarMissao(novosDados: Missao) {
        setMissao(novosDados);
        await salvarMissao(novosDados);
    }
    return (<MissionContext.Provider value={{ missao, atualizarMissao }}>
        {children}
    </MissionContext.Provider>);
}