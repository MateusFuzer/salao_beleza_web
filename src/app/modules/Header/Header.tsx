import Image from "next/image";

export default function Header() {
  return (
    <div className="h-full w-full border-b-2 border-violet-500 ">
      <div className="w-[15%] h-full flex gap-3 justify-center">
        <div className=" content-center">
          <Image
            src="/mulher-com-cabelo-comprido.png"
            width={25}
            height={25}
            alt="Picture of the author"
          />
        </div>
        <span className="content-center text-pink-600 font-bold">Salão da Leila</span>
      </div>
    </div>
  );
}
