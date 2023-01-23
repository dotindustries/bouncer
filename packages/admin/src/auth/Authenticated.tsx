import { signIn, useSession } from "@dotinc/bouncer-auth";
import { useRouter } from "next/router";

export const Authenticated: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      return signIn();
    },
  });

  if (status === "authenticated") {
    return <>{children}</>;
  } else {
    if (typeof window !== "undefined") {
      router.push(
        `/auth/signin` // ?callbackUrl=${encodeURIComponent(router.route)}
      );
    }
  }

  return null;
};
