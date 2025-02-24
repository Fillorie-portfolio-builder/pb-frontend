import Navbar from "./components/Navbar";
import { SendToBack, Share2 } from "lucide-react";
import { Button } from "./components/ui/Button";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF8FF]">
      <section className="py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="text-purple-600">Match Skills to Needs,</span>
          <br />
          <span className="text-purple-600">Build Portfolios</span>
          <br />
          Thrive Together
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Level Up Your Portfolio with Real-World Projects. Your Career Launchpad!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button className="px-8 py-6 text-lg">
            <SendToBack className="mr-2 h-5 w-5" />
            Gain Experience
          </Button>
          <Button variant="outline" className="px-8 py-6 text-lg">
            <Share2 className="mr-2 h-5 w-5" />
            Post My Project
          </Button>
        </div>
      </section>
    </div>
  );
}
