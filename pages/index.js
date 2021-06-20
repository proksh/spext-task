import Head from 'next/head';
import AudioPlayer from '../components/player/AudioPlayer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Spext</title>
        <meta name="description" content="Spext Task" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-brand minh-100vh d-flex flex-column justify-content-center">
        <AudioPlayer />
      </main>
    </>
  )
}
