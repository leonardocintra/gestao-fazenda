"use client";

import {
  Button,
  DatePicker,
  NumberInput,
  TextInput,
  Textarea,
} from "@tremor/react";
import { addDoc, collection } from "firebase/firestore";
import { FormEvent, useState } from "react";
import firebaseData from "../../firebase/config";
import { IOperador } from "../../interfaces/IOperador";
import { parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/navigation";
import MensagemAviso from "../../components/MensagemAviso";
import { ExclamationIcon } from "@heroicons/react/solid";
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
        hora: {
          horaFiltroCombustivel: parseInt(
            formData.get("horaFiltroCombustivel") as string
          ),
          horaFiltroOleoMotor: parseInt(
            formData.get("horaFiltroOleoMotor") as string
          ),
        },
        observacao: formData.get("observacao") as string,
        status: formData.get("status") as string,
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
      <form className="space-y-3 flex flex-col" onSubmit={cadastrarMaquina}>
        <TextInput placeholder="Nome ..." name="nome" />
        <TextInput placeholder="Marca ..." name="marca" />
        <NumberInput
          name="horaFiltroCombustivel"
          placeholder="Hora filtro combustivel ..."
          enableStepper={false}
        />
        <NumberInput
          name="horaFiltroOleoMotor"
          placeholder="Hora filtro oleo motor ..."
          enableStepper={false}
        />
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
