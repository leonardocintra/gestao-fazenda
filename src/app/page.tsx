"use client";

import {
  Button,
  Card,
  Title,
} from "@tremor/react";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="">
      <Title>Cadastro padrão</Title>
      <Card className="sm:space-x-2 space-y-2 sm:space-y-0 flex flex-col sm:flex-row">
        <Button tooltip="Gerencie seus funcionários">Funcionários</Button>
        <Button
          tooltip="Registre aqui as atividades de sua fazenda"
          color="cyan"
          onClick={() => router.push("/atividade")}
        >
          Atividades
        </Button>
        <Button tooltip="Gerencie suas lavoras" color="emerald">
          Lavoura
        </Button>
        <Button tooltip="Gerencie suas maquinas, tratores, etc" color="fuchsia">
          Maquinas
        </Button>
      </Card>
    </div>
  );
}
