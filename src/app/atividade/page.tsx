"use client";

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Card,
  Divider,
  Flex,
  List,
  ListItem,
  NumberInput,
  SearchSelect,
  SearchSelectItem,
  TextInput,
  Title,
} from "@tremor/react";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { useState, useEffect, FormEvent } from "react";
import { IAtividade } from "../interfaces/IAtividade";
import firebaseData from "../firebase/config";
import { ITipoAtividade } from "../interfaces/ITipoAtividade";

export default function AtividadePage() {
  const db = firebaseData.db;

  const [atividades, setAtividades] = useState<IAtividade[]>([]);
  const [tipoAtividades, setTipoAtividades] = useState<ITipoAtividade[]>([]);
  const [selectAtividadeValue, setSelectAtividadeValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshotAtividades = await getDocs(
        collection(db, "atividades")
      );
      const querySnapshotTipoAtividades = await getDocs(
        collection(db, "tipo_atividade")
      );
      const atividadesData: IAtividade[] = [];
      const tipoAtividadesData: ITipoAtividade[] = [];

      querySnapshotAtividades.forEach((doc) => {
        atividadesData.push({
          id: doc.id,
          descricao: doc.data().descricao,
          funcionario: doc.data().funcionario,
          quantidade: doc.data().quantidade,
          unidadeMedida: doc.data().unidadeMedida,
          tipoAtividade: doc.data().tipoAtividade,
        });
      });

      querySnapshotTipoAtividades.forEach((doc) => {
        tipoAtividadesData.push({
          id: doc.id,
          descricao: doc.data().descricao,
        });
      });

      setAtividades(atividadesData);
      setTipoAtividades(tipoAtividadesData);
    };

    fetchData();
  }, [db]);

  async function cadastrarTipoAtividade(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const docRef = await addDoc(collection(db, "tipo_atividade"), {
        descricao: formData.get("descricao"),
      });
      console.log("Documento salvo com:", docRef.id);
    } catch (e) {
      console.error(e);
    }
  }

  async function cadastrarAtividade(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);

      const docRef = await addDoc(collection(db, "atividades"), {
        descricao: formData.get("descricao"),
        quantidade: formData.get("quantidade"),
        unidadeMedida: "horas",
        funcionario: formData.get("funcionario"),
        tipoAtividade: selectAtividadeValue,
      });
      console.log("Documento salvo com:", docRef.id);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Card className="max-w-lg p-3">
      <Title className="mb-2">Tipos de atividades</Title>

      <Accordion className="">
        <AccordionHeader>Cadastradas</AccordionHeader>
        <AccordionBody>
          <form onSubmit={cadastrarTipoAtividade}>
            <Flex className="space-x-2">
              <TextInput placeholder="Nome atividade ..." name="descricao" />
              <Button type="submit" color="emerald">
                Salvar
              </Button>
            </Flex>
          </form>

          <List>
            {tipoAtividades.map((tipoAtividade) => (
              <ListItem
                key={tipoAtividade.id}
                className="hover:bg-slate-200 duration-100 rounded-md p-2"
              >
                <span>{tipoAtividade.descricao}</span>
                <Button size="xs" color="red" tooltip="remover">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </Button>
              </ListItem>
            ))}
          </List>
        </AccordionBody>
      </Accordion>

      <Divider />
      <Title>Atividades</Title>

      <form onSubmit={cadastrarAtividade} className="space-y-2">
        <SearchSelect
          value={selectAtividadeValue}
          onValueChange={setSelectAtividadeValue}
        >
          {tipoAtividades.map((tipoAtividade) => (
            <SearchSelectItem key={tipoAtividade.id} value={tipoAtividade.id}>
              {tipoAtividade.descricao}
            </SearchSelectItem>
          ))}
        </SearchSelect>

        <TextInput placeholder="Atividade ..." name="descricao" />
        <NumberInput placeholder="Quantidade ..." name="quantidade" min={0} />
        <TextInput placeholder="Funcionario ..." name="funcionario" />
        <Button type="submit" color="green">
          Registrar
        </Button>
      </form>

      <List>
        {atividades.map((item) => (
          <ListItem key={item.id}>
            <span>{item.funcionario}</span>
            <span>{item.quantidade}</span>
            <span>{item.unidadeMedida}</span>
            <span>{item.descricao}</span>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
