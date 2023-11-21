"use client";

import {
  Button,
  Card,
  Grid,
  List,
  ListItem,
  NumberInput,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  TextInput,
  Title,
} from "@tremor/react";

import firebase_app from "./firebase/config";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { IAtividade } from "./interfaces/IAtividade";
import { useEffect, useState } from "react";

export default function Home() {
  const firebaseApp = firebase_app;
  const db = getFirestore(firebaseApp);

  const [atividades, setAtividades] = useState<IAtividade[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "atividades"));
      const atividadesData: IAtividade[] = [];

      querySnapshot.forEach((doc) => {
        atividadesData.push({
          id: doc.id,
          descricao: doc.data().descricao,
          funcionario: doc.data().funcionario,
          quantidade: doc.data().quantidade,
          unidadeMedida: doc.data().unidadeMedida,
        });
      });

      setAtividades(atividadesData);
    };

    fetchData();
  }, [db]);

  const handleAtividade = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "atividades"), {
        descricao: "Dormir na rede",
        quantidade: 2,
        unidadeMedida: "horas",
        funcionario: "Isac Cintra",
      });
      console.log("Documento salvo com:", docRef.id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="p-12">
      <Title>Fazenda Cristo Rei</Title>
      <Text>Dados da fazenda - Cristo Rei</Text>

      <TabGroup className="mt-6">
        <TabList>
          <Tab>Geral</Tab>
          <Tab>Detalhados</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
              <Card>
                {/* Placeholder to set height */}
                <div className="h-28 space-y-2">
                  <form action="post" onSubmit={handleAtividade}>
                    <TextInput placeholder="Atividade" />
                    <NumberInput placeholder="Quantidade" />
                    <Button type="submit" size="xs">
                      Salvar
                    </Button>
                  </form>
                </div>
              </Card>
              <Card>
                {/* Placeholder to set height */}
                <div className="h-28"></div>
              </Card>
              <Card>
                {/* Placeholder to set height */}
                <div className="h-28" />
              </Card>
            </Grid>
            <div className="mt-6">
              <Card>
                <div className="h-80" />
              </Card>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-6">
              <Card>
                <div className="h-96">
                  <Title>Atividades</Title>
                  <List>
                    {atividades.map((item) => (
                      <ListItem key={item.id}>
                        <span>{item.descricao}</span>
                        <span>{item.funcionario}</span>
                        <span>{item.quantidade}</span>
                        <span>{item.unidadeMedida}</span>
                      </ListItem>
                    ))}
                  </List>
                </div>
              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
}
