import { CreateNoteBar } from "./createNoteBar";

export const Home = () => {
  return (
    <div className="p-8 w-full h-screen flex flex-col items-center">
      <CreateNoteBar />
    </div>
  )
};