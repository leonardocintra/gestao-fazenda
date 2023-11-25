"use client";

import {
  Button,
  Card,
  Flex,
  NumberInput,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@tremor/react";
import { IoConstructOutline } from "react-icons/io5";
import { FaTractor } from "react-icons/fa";
import { addDoc, collection } from "firebase/firestore";
import { FormEvent, useState } from "react";
import firebaseData from "../../firebase/config";
import { useRouter } from "next/navigation";
import MensagemAviso from "../../components/MensagemAviso";
import { ExclamationIcon } from "@heroicons/react/solid";
import { IMaquina } from "../../interfaces/IMaquina";
import BotaoSalvarVoltar from "../../components/BotaoSalvarVoltar";

export default function NovaMaquinarPage() {
  const router = useRouter();
  const db = firebaseData.db;

  const [mensagem, setMensagem] = useState<string>("");

  async function cadastrarMaquina(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);

      const data: IMaquina = {
        nome: formData.get("nome") as string,
        marca: formData.get("marca") as string,
        horaAtual: {
          oleoMotor: parseInt(formData.get("oleoMotorAtual") as string),
          oleoHidraulico: parseInt(
            formData.get("oleoHidraulicoAtual") as string
          ),
          filtroOleoMotor: parseInt(
            formData.get("filtroOleoMotorAtual") as string
          ),
          filtroOleoHidraulico: parseInt(
            formData.get("filtroOleoHidraulicoAtual") as string
          ),
          filtroCombustivel: parseInt(
            formData.get("filtroCombustivelAtual") as string
          ),
        },
        horaAviso: {
          oleoMotor: parseInt(formData.get("oleoMotorAviso") as string),
          oleoHidraulico: parseInt(
            formData.get("oleoHidraulicoAviso") as string
          ),
          filtroOleoMotor: parseInt(
            formData.get("filtroOleoMotorAviso") as string
          ),
          filtroOleoHidraulico: parseInt(
            formData.get("filtroOleoHidraulicoAviso") as string
          ),
          filtroCombustivel: parseInt(
            formData.get("filtroCombustivelAviso") as string
          ),
        },
        observacao: formData.get("observacao") as string,
        status: "ativo",
      };

      const docRef = await addDoc(collection(db, "maquinas"), data);
      console.log("Documento salvo com:", docRef.id);
      router.push("/maquinas");
    } catch (e) {
      const erroString = e instanceof Error ? e.message : String(e);
      setMensagem("Ocorreu um erro: " + erroString);
    }
  }

  return (
    <div className="max-w-lg">
      <form className="space-y-2" onSubmit={cadastrarMaquina}>
        <Card decoration="top" decorationColor="cyan" className="space-y-2">
          <Title className="flex items-center gap-2">
            <FaTractor /> Identificação
          </Title>
          <Flex className="space-x-2">
            <Text>Nome:</Text>
            <TextInput placeholder="Nome ..." name="nome" />
          </Flex>
          <Flex className="space-x-2">
            <Text>Marca:</Text>
            <TextInput placeholder="Marca ..." name="marca" />
          </Flex>
        </Card>

        <Card decoration="top" decorationColor="amber" className="p-3">
          <Title className="flex items-center gap-2">
            <IoConstructOutline /> Manutenção
          </Title>

          {handleTextManutencao("Óleo do motor")}
          <Flex className="space-x-2">
            <NumberInput
              name="oleoMotorAtual"
              placeholder="hora atual"
              min={0}
              enableStepper={false}
            />
            <NumberInput
              name="oleoMotorAviso"
              placeholder="trocar a cada ..."
              min={0}
              enableStepper={false}
            />
          </Flex>

          {handleTextManutencao("Óleo hidraulico")}
          <Flex className="space-x-2">
            <NumberInput
              name="oleoHidraulicoAtual"
              placeholder="hora atual"
              min={0}
              enableStepper={false}
            />
            <NumberInput
              name="oleoHidraulicoAviso"
              placeholder="trocar a cada ..."
              min={0}
              enableStepper={false}
            />
          </Flex>

          {handleTextManutencao("Filtro óleo motor")}
          <Flex className="space-x-2">
            <NumberInput
              name="filtroOleoMotorAtual"
              placeholder="hora atual"
              min={0}
              enableStepper={false}
            />
            <NumberInput
              name="filtroOleoMotorAviso"
              placeholder="trocar a cada ..."
              min={0}
              enableStepper={false}
            />
          </Flex>

          {handleTextManutencao("Filtro óleo hidraulico")}
          <Flex className="space-x-2">
            <NumberInput
              name="filtroOleoHidraulicoAtual"
              placeholder="hora atual"
              min={0}
              enableStepper={false}
            />
            <NumberInput
              name="filtroOleoHidraulicoAviso"
              placeholder="trocar a cada ..."
              min={0}
              enableStepper={false}
            />
          </Flex>

          {handleTextManutencao("Filtro combustivel")}
          <Flex className="space-x-2">
            <NumberInput
              name="filtroCombustivelAtual"
              placeholder="hora atual"
              min={0}
              enableStepper={false}
            />
            <NumberInput
              name="filtroCombustivelAviso"
              placeholder="trocar a cada ..."
              min={0}
              enableStepper={false}
            />
          </Flex>

          <Flex className="mt-4">
            <Button
              tooltip="Desativado. Nova funcionalidade em breve"
              className="w-full"
              color="neutral"
              disabled={true}
            >
              Criar Manutenção
            </Button>
          </Flex>
        </Card>

        <Textarea
          placeholder="Alguma observação ..."
          name="observacao"
          rows={3}
        />

        <BotaoSalvarVoltar url="/maquinas" />
      </form>

      {mensagem ? (
        <>
          <MensagemAviso
            mensagem={mensagem}
            title="Erro no cadastro"
            color="red"
            icon={ExclamationIcon}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );

  function handleTextManutencao(texto: string) {
    return (
      <Text className="w-full mt-5 mb-1 text-center font-semibold">
        {texto}
      </Text>
    );
  }
}
