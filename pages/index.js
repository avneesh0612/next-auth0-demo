import styles from "../styles/Home.module.css";
import { getSession, signIn, signOut } from "next-auth/client";
import Head from "next/head";
import Image from "next/image";

export default function Home({ session }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next auth0 demo</title>
      </Head>
      {session ? (
        <button onClick={() => signOut()}>Sign out</button>
      ) : (
        <button onClick={() => signIn()}>Sign in</button>
      )}
      {session && (
        <div>
          <p>Signed in as {session.user.email}</p>
          <p>Name: {session.user.name}</p>
          <Image
            width={200}
            height={200}
            src={session.user.image}
            alt={session.user.name}
          />
        </div>
      )}
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
