import { useEffect, useRef } from 'react';
import Head from 'next/head'
import gsap from 'gsap';

export default function Home() {
  const glitchAnimationRef = useRef(null);

  useEffect(() => {
    gsap.from(".title", { opacity: 0, y: 100, duration: 2 });
    const glitchEl = document.querySelector('.cybr_glitch');

    glitchAnimationRef.current = setInterval(() => {
      glitchEl.classList.toggle('glitch_animation');
    }, 1500);

    return () => {
      clearInterval(glitchAnimationRef.current);
    };
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          <span>Welcome to Next.js & WebGL</span>
          <span aria-hidden className="cybr_glitch">Welcome to Next.js & WebGL</span>
        </h1>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .title {
          text-align: center;
          margin: 0;
          --color: hsl(0, 0%, 100%);
          --font-size: 6rem;
          --border: 1rem;
          --clip-one: polygon(0 2%, 100% 2%, 100% 95%, 95% 95%, 95% 90%, 85% 90%, 85% 95%, 8% 95%, 0 70%);
          --clip-two: polygon(0 78%, 100% 78%, 100% 100%, 95% 100%, 95% 90%, 85% 90%, 85% 100%, 8% 100%, 0 78%);
          --clip-three: polygon(0 44%, 100% 44%, 100% 54%, 95% 54%, 95% 54%, 85% 54%, 85% 54%, 8% 54%, 0 54%);
          --clip-four: polygon(0 0, 100% 0, 100% 0, 95% 0, 95% 0, 85% 0, 85% 0, 8% 0, 0 0);
          --clip-five: polygon(0 0, 100% 0, 100% 0, 95% 0, 95% 0, 85% 0, 85% 0, 8% 0, 0 0);
          --clip-six: polygon(0 40%, 100% 40%, 100% 85%, 95% 85%, 95% 85%, 85% 85%, 85% 85%, 8% 85%, 0 70%);
          --clip-seven: polygon(0 63%, 100% 63%, 100% 80%, 95% 80%, 95% 80%, 85% 80%, 85% 80%, 8% 80%, 0 70%);
          font-family: 'Cyber', sans-serif;
          color: var(--color);
          background: transparent;
          text-transform: uppercase;
          font-size: var(--font-size);
          outline: transparent;
          letter-spacing: 2px;
          position: relative;
          border: 0;
          min-width: 300px;
        }

        .cybr_glitch {
          position: absolute;
          top: calc(var(--border) * -1);
          left: calc(var(--border) * -1);
          right: calc(var(--border) * -1);
          bottom: calc(var(--border) * -1);
          background: black;
        }

        .glitch_animation {
          animation: glitch 0.1s 1.4s infinite;
        }

        @media screen and (max-width: 800px) {
          .title {
            --font-size: 1.5rem;
            --border: 0.25rem;
          }
        }

        @keyframes glitch {
          0% {
            clip-path: var(--clip-one);
          }
          2%, 8% {
            clip-path: var(--clip-two);
            transform: translate(calc(var(--shimmy-distance) * -1%), 0);
          }
          6% {
            clip-path: var(--clip-two);
            transform: translate(calc(var(--shimmy-distance) * 1%), 0);
          }
          9% {
            clip-path: var(--clip-two);
            transform: translate(0, 0);
          }
          10% {
            clip-path: var(--clip-three);
            transform: translate(calc(var(--shimmy-distance) * 1%), 0);
          }
          13% {
            clip-path: var(--clip-three);
            transform: translate(0, 0);
          }
          14%, 21% {
            clip-path: var(--clip-four);
            transform: translate(calc(var(--shimmy-distance) * 1%), 0);
          }
          25% {
            clip-path: var(--clip-five);
            transform: translate(calc(var(--shimmy-distance) * 1%), 0);
          }
          30% {
            clip-path: var(--clip-five);
            transform: translate(calc(var(--shimmy-distance) * -1%), 0);
          }
          35%, 45% {
            clip-path: var(--clip-six);
            transform: translate(calc(var(--shimmy-distance) * -1%));
          }
          40% {
            clip-path: var(--clip-six);
            transform: translate(calc(var(--shimmy-distance) * 1%));
          }
          50% {
            clip-path: var(--clip-six);
            transform: translate(0, 0);
          }
          55% {
            clip-path: var(--clip-seven);
            transform: translate(calc(var(--shimmy-distance) * 1%), 0);
          }
          60% {
            clip-path: var(--clip-seven);
            transform: translate(0, 0);
          }
          31%, 61%, 100% {
            clip-path: var(--clip-four);
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          background: black;
        }

        @font-face {
          font-family: Cyber;
          src: url("/fonts/Cyber/Cyberpunk.ttf");
          font-display: swap;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
