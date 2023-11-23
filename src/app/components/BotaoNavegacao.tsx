import { Button, Color } from "@tremor/react";
import { useRouter } from "next/navigation";

type BotaoNavegacaoProps = {
  description: string;
  tooltip: string;
  url: string;
  color?: Color;
};

export default function BotaoNavegacao(props: BotaoNavegacaoProps) {
  const router = useRouter();

  return (
    <Button
      color={props.color}
      tooltip={props.tooltip}
      onClick={() => router.push(`${props.url}`)}
    >
      {props.description}
    </Button>
  );
}
