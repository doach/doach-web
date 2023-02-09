import { IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IoIosArrowRoundBack } from "react-icons/io";

type ReturnButtonProps = {
  prevUrl: string;
};

export default function ReturnButton({ prevUrl }: ReturnButtonProps) {
  const router = useRouter();
  return (
    <IconButton
      fontSize={"3xl"}
      variant={"ghost"}
      icon={<IoIosArrowRoundBack />}
      aria-label={"Go back"}
      onClick={() => router.push(prevUrl === "home" ? "/" : `/${prevUrl}`)}
    />
  );
}
