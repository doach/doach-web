import { ArrowBackIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";

type ReturnButtonProps = {
  prevUrl: string;
};

export default function ReturnButton({ prevUrl }: ReturnButtonProps) {
  const router = useRouter();
  return (
    <IconButton
      variant={"ghost"}
      icon={<ArrowBackIcon />}
      aria-label={"Go back"}
      onClick={() => router.push(prevUrl === "home" ? "/" : `/${prevUrl}`)}
    />
  );
}
