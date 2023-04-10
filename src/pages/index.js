import Image from 'next/image'
import Head from 'next/head'
import { useStateContext } from '@/contexts/ContextProvider';
import { useEffect } from 'react';
import Layout from '@/components/Layout';

export const metadata = {
  title: "Invify",
  description: "A simple inventory management app with AI-driven suggestions",
};

export default function Home() {

  return (
    <>
    <Head>
      <title>Invify</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main >
     <Layout/>
    </main>
    </>
  )
}
