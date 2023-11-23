"use client";

import { Card, Title } from "@tremor/react";

import BotaoNavegacao from "./components/BotaoNavegacao";

export default function Home() {
  return (
    <div className="">
      <Title>Cadastro padrão</Title>
      <Card className="sm:space-x-2 space-y-2 sm:space-y-0 flex flex-col sm:flex-row">
        <BotaoNavegacao
          description="Operadores"
          tooltip="Gerencie seus funcionários"
          url="/operador"
        />
        <BotaoNavegacao
          description="Atividades"
          tooltip="Gerencie seus serviços e atividades"
          url="/atividade"
          color="cyan"
        />
      </Card>
    </div>
  );
}
