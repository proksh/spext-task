import Head from 'next/head';
import { useRef, useEffect } from 'react';
import AudioPlayer from '../components/player/AudioPlayer';

export default function Home() {
  const mainRef = useRef(null);

  useEffect(() => {
    mainRef.current.classList.remove('opacity-0');
  }, [])

  return (
    <>
      <Head>
        <title>Spext</title>
        <meta name="description" content="Spext Task" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main ref={mainRef} className="bg-white sm:bg-brand flex flex-col justify-center sm:justify-start xl:justify-center min-h-screen transition-opacity opacity-0">
        <AudioPlayer />
      </main>
    </>
  )
}
