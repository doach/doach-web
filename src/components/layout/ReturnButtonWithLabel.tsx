import { Button, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IoIosArrowRoundBack } from "react-icons/io";

type ReturnButtonProps = {
  color?: string;
  label: string;
  prevUrl: string;
};

export default function ReturnButtonWithLabel({ color, label, prevUrl }: ReturnButtonProps) {
  const router = useRouter();
  return (
    <Button
      p={0}
      color={color ?? "black"}
      variant={"ghost"}
      leftIcon={<IoIosArrowRoundBack fontSize={40} />}
      aria-label={"Go back"}
      onClick={() => router.push(prevUrl === "home" ? "/" : `/${prevUrl}`)}
    >
      {label}
    </Button>
  );
}
