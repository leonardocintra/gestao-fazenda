import { Button } from "@tremor/react";
import { useRouter } from "next/navigation";

type BotaoSalvarVoltarProps = {
  url: string;
};

export default function BotaoSalvarVoltar(props: BotaoSalvarVoltarProps) {
  const router = useRouter();

  return (
    <div className="space-x-3 flex justify-end">
      <Button className="px-8" color="green" type="submit">
        Salvar
      </Button>
      <Button
        onClick={() => router.push(props.url)}
        className="px-8"
        color="amber"
        type="button"
      >
        Voltar
      </Button>
    </div>
  );
}
