import {
  useSession,
  signIn,
  startAuthentication,
  PublicKeyCredentialRequestOptionsJSON,
} from "@dotinc/bouncer-auth";
import { ChangeEvent, KeyboardEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/router";

const SignInComponent = () => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);

  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  });

  async function signInWithEmail() {
    return signIn("email", { email });
  }

  async function signInWithWebauthn() {
    const url = new URL(
      "/api/auth/webauthn/authenticate",
      window.location.origin
    );
    url.search = new URLSearchParams({ email }).toString();
    const optionsResponse = await fetch(url.toString());

    if (optionsResponse.status !== 200) {
      throw new Error("Could not get authentication options from server");
    }
    const opt: PublicKeyCredentialRequestOptionsJSON =
      await optionsResponse.json();

    if (!opt.allowCredentials || opt.allowCredentials.length === 0) {
      throw new Error("There is no registered credential.");
    }

    const credential = await startAuthentication(opt);

    await signIn("credentials", {
      id: credential.id,
      rawId: credential.rawId,
      type: credential.type,
      clientDataJSON: credential.response.clientDataJSON,
      authenticatorData: credential.response.authenticatorData,
      signature: credential.response.signature,
      userHandle: credential.response.userHandle,
    });
  }

  async function handleSignIn() {
    try {
      await signInWithWebauthn();
    } catch (error) {
      console.log(error);
      await signInWithEmail();
    }
  }

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      return handleSignIn();
    }
  };

  function updateEmail(e: ChangeEvent<HTMLInputElement>) {
    setIsValid(e.target.validity.valid);
    setEmail(e.target.value);
  }

  return (
    <div>
      <main>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            name="email"
            type="email"
            id="email"
            autoComplete="home email"
            placeholder="Enter your email"
            value={email}
            onChange={updateEmail}
            onKeyDown={handleKeyDown}
          />
          <button type="button" onClick={handleSignIn} disabled={!isValid}>
            Sign in
          </button>
        </form>
      </main>
    </div>
  );
};

export const AuthPage = () => {
  return <SignInComponent />;
};
