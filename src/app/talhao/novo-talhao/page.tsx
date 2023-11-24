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
import { parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/navigation";
import MensagemAviso from "../../components/MensagemAviso";
import { ExclamationIcon } from "@heroicons/react/solid";
import { ITalhao } from "../../interfaces/ITalhao";

export default function NovoTalhaoPage() {
  const router = useRouter();
  const db = firebaseData.db;

  const [mensagem, setMensagem] = useState<string>("");

  async function cadastrarTalhao(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const dataFormatada = parse(
        formData.get("dataInicio") as string,
        "dd/MM/yyyy",
        new Date(),
        { locale: ptBR }
      );

      const data: ITalhao = {
        nome: formData.get("nome") as string,
        dataInicio: dataFormatada,
        areaPlantada: parseInt(String(formData.get("areaPlantada")) || "0", 10),
        observacao: formData.get("observacao") as string,
        status: "ativa",
      };

      const docRef = await addDoc(collection(db, "talhao"), data);
      console.log("Documento salvo com:", docRef.id);
      router.push("/talhao");
    } catch (e) {
      const erroString = e instanceof Error ? e.message : String(e);
      if (
        erroString === "Invalid time value" ||
        erroString === "Invalid Date"
      ) {
        setMensagem("Coloque a data no formado dd/MM/yyyy. Ex: 29/01/1990");
      } else {
        setMensagem("Ocorreu um erro: " + erroString);
      }
    }
  }

  return (
    <div className="max-w-lg">
      <form className="space-y-3 flex flex-col" onSubmit={cadastrarTalhao}>
        <TextInput placeholder="Nome talhao ..." name="nome" />
        <NumberInput
          placeholder="Area plantada ..."
          enableStepper={false}
          name="areaPlantada"
          min={0}
        />
        <TextInput
          placeholder="Data de inicio"
          name="dataInicio"
          id="dataInicio"
          onClick={() => setMensagem("")}
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
