import { signIn, useSession } from "@dotinc/bouncer-auth";
import { Box } from "@dotinc/bouncer-ui";
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

  if (status === "loading") {
    return (
      <Box flex={1} w="100%" h="100%" alignItems="center" justifyItems="center">
        <p>not working css - full page loading screen...</p>
      </Box>
    );
  }

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
