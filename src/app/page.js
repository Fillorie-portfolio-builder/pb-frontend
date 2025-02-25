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
          Level Up Your Portfolio with Real-World Projects. Your Career
          Launchpad!
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
      <section className="py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          How It Works
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          {[
            {
              number: "1",
              title: "Gain Experience",
              description:
                "Find real-world projects that match your skills and interests.",
            },
            {
              number: "2",
              title: "Build Your Portfolio",
              description:
                "Complete projects and showcase your work in a professional portfolio.",
            },
            {
              number: "3",
              title: "Share It With The World",
              description:
                "Leverage your portfolio to land your dream job or freelance gigs.",
            },
          ].map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-xl font-semibold mx-auto mb-6">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
      {/* <section className="py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Testimonials and Success Stories
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-600 font-semibold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </section> */}

      
    </div>
  );
}
