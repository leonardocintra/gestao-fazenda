"use client";

import { Card, Metric, Title } from "@tremor/react";

import BotaoNavegacao from "./components/BotaoNavegacao";

export default function Home() {
  return (
    <div className="">
      <Metric className="m-2">Cadastro padrão</Metric>
      <Card className="sm:space-x-2 space-y-2 sm:space-y-0 flex flex-col sm:flex-row">
        <BotaoNavegacao
          description="Operadores"
          tooltip="Gerencie seus funcionários"
          url="/operador"
        />
        <BotaoNavegacao
          description="Maquinas"
          tooltip="Gerencie seus tratores, maquinarios, etc"
          url="/maquinas"
          color="red"
        />
        <BotaoNavegacao
          description="Talhão"
          tooltip="Gerencie suas lavouras"
          url="/talhao"
          color="emerald"
        />
      </Card>
    </div>
  );
}
