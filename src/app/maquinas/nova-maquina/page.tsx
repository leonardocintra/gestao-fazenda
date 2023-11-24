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
import { ImWarning } from "react-icons/im";
import { IMaquina } from "../../interfaces/IMaquina";

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

          <Text className="font-bold p-2 text-red-700 flex items-center justify-center gap-2">
            <ImWarning />
            valor atual | valor de aviso
          </Text>

          <Flex className="mt-2 space-x-2">
            <Text className="w-full">Óleo do motor</Text>
            <NumberInput
              name="oleoMotorAtual"
              placeholder="Oleo do motor"
              min={0}
              enableStepper={false}
            />
            <NumberInput
              name="oleoMotorAviso"
              placeholder="Oleo do motor"
              min={0}
              enableStepper={false}
            />
          </Flex>

          <Flex className="mt-2 space-x-2">
            <Text className="w-full">Oleo hidraulico</Text>
            <NumberInput
              name="oleoHidraulicoAtual"
              placeholder="Oleo hidraulico"
              min={0}
              enableStepper={false}
            />
            <NumberInput
              name="oleoHidraulicoAviso"
              placeholder="Oleo hidraulico"
              min={0}
              enableStepper={false}
            />
          </Flex>

          <Flex className="mt-2 space-x-2">
            <Text className="w-full">Filtro óleo motor</Text>
            <NumberInput
              name="filtroOleoMotorAtual"
              placeholder="Filtro oleto motor"
              min={0}
              enableStepper={false}
            />
            <NumberInput
              name="filtroOleoMotorAviso"
              placeholder="Filtro oleto motor"
              min={0}
              enableStepper={false}
            />
          </Flex>

          <Flex className="mt-2 space-x-2">
            <Text className="w-full">Filtro óleo hidraulico</Text>
            <NumberInput
              name="filtroOleoHidraulicoAtual"
              placeholder="Filtro oleo hidraulico"
              min={0}
              enableStepper={false}
            />
            <NumberInput
              name="filtroOleoHidraulicoAviso"
              placeholder="Filtro oleo hidraulico"
              min={0}
              enableStepper={false}
            />
          </Flex>

          <Flex className="mt-2 space-x-2">
            <Text className="w-full">Filtro combustivel</Text>
            <NumberInput
              name="filtroCombustivelAtual"
              placeholder="Filtro combustivel atual"
              min={0}
              enableStepper={false}
            />
            <NumberInput
              name="filtroCombustivelAviso"
              placeholder="Filtro combustivel aviso"
              min={0}
              enableStepper={false}
            />
          </Flex>
        </Card>

        <Textarea placeholder="Alguma observação ..." name="observacao" />
        <Button type="submit">Salvar</Button>
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
}
