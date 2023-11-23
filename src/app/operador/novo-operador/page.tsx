"use client";

import { Button, TextInput, Textarea } from "@tremor/react";
import { addDoc, collection } from "firebase/firestore";
import { FormEvent } from "react";
import firebaseData from "../../firebase/config";
import { IOperador } from "../../interfaces/IOperador";
import { parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/navigation";

export default function NovoOperadorPage() {
  const router = useRouter();
  const db = firebaseData.db;

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

      console.log(typeof dataFormatada);

      const data: IOperador = {
        nome: formData.get("nome") as string,
        dataNascimento: dataFormatada,
        observacao: formData.get("observacao") as string,
      };

      const docRef = await addDoc(collection(db, "operador"), data);
      console.log("Documento salvo com:", docRef.id);
      router.push("/operador");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <form
        className="space-y-3 flex flex-col max-w-md"
        onSubmit={cadastrarOperador}
      >
        <TextInput placeholder="Nome completo" name="nome" />
        <TextInput placeholder="Data de nascimento" name="dataNascimento" />
        <Textarea placeholder="Alguma observação ..." name="observacao" />
        <Button type="submit">Salvar</Button>
      </form>
    </div>
  );
}
