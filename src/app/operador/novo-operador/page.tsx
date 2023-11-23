"use client";

import { Button, TextInput, Textarea } from "@tremor/react";
import { addDoc, collection } from "firebase/firestore";
import { FormEvent, useState } from "react";
import firebaseData from "../../firebase/config";
import { IOperador } from "../../interfaces/IOperador";
import { parse, set } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/navigation";
import MensagemAviso from "../../components/MensagemAviso";
import { ExclamationIcon } from "@heroicons/react/solid";

export default function NovoOperadorPage() {
  const router = useRouter();
  const db = firebaseData.db;

  const [mensagem, setMensagem] = useState<string>("");

  async function cadastrarOperador(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const dataFormatada = parse(
        formData.get("dataNascimento") as string,
        "dd/MM/yyyy",
        new Date(),
        { locale: ptBR }
      );

      const data: IOperador = {
        nome: formData.get("nome") as string,
        dataNascimento: dataFormatada,
        observacao: formData.get("observacao") as string,
        status: "trabalhando",
      };

      const docRef = await addDoc(collection(db, "operador"), data);
      console.log("Documento salvo com:", docRef.id);
      router.push("/operador");
    } catch (e) {
      const erroString = e instanceof Error ? e.message : String(e);
      if (erroString === "Invalid time value") {
        setMensagem("Coloque a data no formado dd/MM/yyyy. Ex: 29/01/1990");
      } else {
        setMensagem("Ocorreu um erro: " + erroString);
      }
    }
  }

  return (
    <div className="max-w-lg">
      <form className="space-y-3 flex flex-col" onSubmit={cadastrarOperador}>
        <TextInput placeholder="Nome completo" name="nome" />
        <TextInput
          placeholder="Data de nascimento"
          name="dataNascimento"
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
