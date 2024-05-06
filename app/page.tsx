import Image from "next/image";
import { ThemeToggle } from "./components/Themetoggle";

export default function Home() {
  return (
<section className="flex items-center justify-center bg-background h-[90vh]">
  <div className="relative items-center w-full px-5 py-12 mx-auto lg:px-15 max-w-7xl md:px-12">
    <div className="max-w-3xl mx-auto text-center">
      <span className="w-auto px-6 py-3 rounded-full bg-secondary">
        <span>Sort your notes easily.</span>
      </span>

    </div>
  </div>
</section>  
  );
}
