import Link from 'next/link';

export default function Home() {
  return (
    <main className=" text-center text-black font-bold">
      <div className='min-h-screen min-w-screen flex justify-center items-center'>
        <div className='bg-white p-10 rounded-2xl shadow-2xl align-center '>
          <h1 className="text-5xl pb-5">
            TicTacToe!
          </h1>
          <p>
            Single & Multiplayer TicTacToe!
          </p>
          <div >
            <button className="rounded-full bg-slate-700 text-white pr-5 pl-5 m-5 hover:bg-black hover:text-white duration-200">
              Sign in
            </button>
            <button className="rounded-full bg-slate-700 text-white pr-5 pl-5 m-5 hover:bg-black hover:text-white duration-200">
              Sign Up
            </button>
          </div>
          <div className='bg-black h-0.5 w-full relative'>
            <span className='bg-white pr-2 pl-2 flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>or</span>
          </div>
            <button className="rounded-full bg-slate-700 text-white pl-5 pr-5 pt-2 pb-2 mt-5 hover:bg-black hover:text-white duration-200">
             <Link href={'/game'}>
              PLAY
             </Link>
            </button>
        </div>
      </div>
    </main>
  );
}
