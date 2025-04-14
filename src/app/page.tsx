//import { redirect } from 'next/navigation';
'use client';
//랜딩페이지로 수정했어요
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import Link from 'next/link';
export default function Home() {
  //redirect('/main/challenge');
  return (
    <div className="w-screen min-h-screen bg-black text-white flex flex-col justify-center items-center">
      {/* 터미널 스타일 */}
      <div className="dev-font text-green-400 text-sm md:text-base">
        <p className="mb-1">{'>'} Initializing journey...</p>
        <p className="mb-1 animate-pulse">{'>'} Connecting to Docthru...</p>
        <p className="mb-4">{'>'} Access granted.</p>
      </div>

      {/* 로고  */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-center font-[quantico] text-white glow">
        <Typewriter
          words={['Docthru']}
          loop={1}
          cursor
          cursorStyle="|"
          typeSpeed={180}
        />
      </h1>
      {/* Through the docs, to the dev. (docs로부터 개발자로 가는 여정) 괜찮나요?( @@ )ノ💻 */}
      <motion.p
        className="text-lg md:text-2xl text-center m-4 text-gray-300 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Through the docs, to the dev.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <Link href="/main/challenge">
          <motion.button
            className="cursor-pointer mt-4 px-6 py-3 md:px-10 md:py-4 bg-yellow-400 text-black text-sm md:text-lg font-bold rounded-xl hover:bg-yellow-300 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            지금 도전하기 →
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
