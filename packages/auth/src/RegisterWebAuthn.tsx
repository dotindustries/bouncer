import { Button, Card, CardBody, CardFooter, Flex } from "@dotinc/bouncer-ui";
import { startRegistration } from "@simplewebauthn/browser";
import { signIn, signOut, useSession } from "..";

export const RegisterWebAuthn = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      return signIn();
    },
  });

  async function registerWebauthn() {
    const optionsResponse = await fetch("/api/auth/webauthn/register");
    if (optionsResponse.status !== 200) {
      alert("Could not get registration options from server");
      return;
    }
    const opt = await optionsResponse.json();

    try {
      const credential = await startRegistration(opt);

      const response = await fetch("/api/auth/webauthn/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
        credentials: "include",
      });
      if (response.status != 201) {
        alert("Could not register webauthn credentials.");
      } else {
        alert("Your webauthn credentials have been registered.");
      }
    } catch (err) {
      alert(`Registration failed. ${(err as Error).message}`);
    }
  }

  if (status === "authenticated") {
    return (
      <div>
        <Card w={400}>
          <CardBody>Signed in as {session?.user?.email}</CardBody>
          <CardFooter>
            <Flex flex={1} justify={"space-between"} align={"center"}>
              <Button onClick={registerWebauthn}>Register Webauthn</Button>
              <Button variant={"ghost"} onClick={() => signOut()}>
                Log out
              </Button>
            </Flex>
          </CardFooter>
        </Card>
      </div>
    );
  }
  return <div>Loading...</div>;
};
