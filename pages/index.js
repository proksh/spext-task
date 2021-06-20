import Head from 'next/head';
import { useRef, useEffect } from 'react';
import AudioPlayer from '../components/player/AudioPlayer';

export default function Home() {
  const mainRef = useRef(null);

  useEffect(() => {
    mainRef.current.classList.add('loaded');
  }, [])

  return (
    <>
      <Head>
        <title>Spext</title>
        <meta name="description" content="Spext Task" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main ref={mainRef} className="bg-brand minh-100vh d-flex flex-column justify-content-center">
        <AudioPlayer />
      </main>
    </>
  )
}
