import { Notes } from "./notes";
import { Tags } from "./tags";

export const Home = () => {

  return (
    <div className="w-full h-full md:grid md:grid-cols-6">
      <Tags className="md:col-span-1" />
      <Notes className="md:col-span-5" />
    </div>
  )
};