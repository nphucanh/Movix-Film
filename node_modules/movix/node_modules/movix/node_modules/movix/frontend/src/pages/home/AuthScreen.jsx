/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, Download, Telescope, Tv, Users } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate("/signup?email=" + email);
  };

  const reasons = [
    {
      title: "Enjoy on your TV",
      description:
        "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
      icon: Tv,
    },
    {
      title: "Download your shows to watch offline",
      description:
        "Save your favorites easily and always have something to watch.",
      icon: Download,
    },
    {
      title: "Watch everywhere",
      description:
        "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
      icon: Telescope,
    },
    {
      title: "Create profiles for kids",
      description:
        "Send kids on adventures with their favorite characters in a space made just for them — free with your membership.",
      icon: Users,
    },
  ];

  return (
    <div className="hero-bg relative">
      {/* Navbar */}

      <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">
        <img
          src="/movix-logo.png"
          alt="Netflix Logo"
          className="w-32 md:w-52"
        />
        <Link
          to={"/login"}
          className="text-white bg-yellow-500 py-1 px-2 rounded"
        >
          Sign In
        </Link>
      </header>

      {/* hero section */}
      <div className="flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Unlimited movies, TV shows, and more
        </h1>
        <p className="text-lg mb-4">Watch anywhere. Cancel anytime.</p>
        <p className="mb-4">
          Ready to watch? Enter your email to create or restart your membership.
        </p>

        <form
          className="flex flex-col md:flex-row gap-4 w-1/2"
          onSubmit={handleFormSubmit}
        >
          <input
            type="email"
            placeholder="Email address"
            className="p-2 rounded flex-1 bg-black/80 border border-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded flex items-center gap-2 text-lg font-medium"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
        </form>
      </div>
      {/* separator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

      {/* 1st section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-6">
          {/* left side */}
          <div className="flex-1 text-center md:text-left md:px-6">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 sm:text-3xl">
              Enjoy on your TV
            </h2>
            <p className="text-lg md:text-xl">
              Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
              Blu-ray players, and more.
            </p>
          </div>
          {/* right side */}
          <div className="flex-1 relative">
            <img src="/tv.png" alt="Tv image" className="mt-4 z-20 relative" />
            <video
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10"
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/hero-vid.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* 2nd section */}
      <div className='py-10 bg-black text-white'>
				<div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-6'>
					{/* left side */}
          <div className='flex-1 relative overflow-hidden'>
						<img src='/device-pile.png' alt='Device image' className='mt-4 z-20 relative mx-5' />
						<video
							className='absolute top-2 left-1/2 -translate-x-1/2  h-4/6 z-10
               max-w-[63%] 
              '
							playsInline
							autoPlay={true}
							muted
							loop
						>
							<source src='/video-devices.m4v' type='video/mp4' />
						</video>
					</div>
					
					{/* right side */}
          <div className='flex-1 sm:text-center md:text-right lg:text-right md:px-6'>
						<h2 className='text-4xl md:text-5xl font-extrabold mb-4 text-balance sm:text-3xl'>
            Watch everywhere
						</h2>
						<p className='text-lg md:text-xl'>
            Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.
						</p>
					</div>
				</div>
			</div>

      {/* 3rd section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto justify-center md:flex-col flex-col px-4 md:px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 sm:text-3xl">
            More Reasons to Join
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="p-6 rounded-xl relative min-h-[250px] flex flex-col"
                style={{
                  backgroundImage:
                    "linear-gradient(to right bottom, #15162c, #1b1930, #211c35, #271f39, #2d223d, #32233f, #372341, #3d2443, #432242, #492041, #4f1d3f, #551a3c)",
                }}
              >
                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {reason.title}
                </h3>
                <p className="text-gray-400 flex-grow">{reason.description}</p>
                <div className="absolute bottom-4 right-4">
                  <reason.icon
                    className="w-12 h-12 text-white"
                    aria-hidden="true"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 4th section*/}
      <div className="py-10 bg-black text-white">
        <div
          className="flex max-w-6xl mx-auto items-center justify-center flex-col-reverse md:flex-row
           px-4 md:px-2
        "
        >
          {/* left */}
          <div className="flex-1 relative">
            <img src="/kids.png" alt="Enjoy on your TV" className="mt-4" />
          </div>
          {/* right */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 sm:text-3xl">
              Create profiles for kids
            </h2>
            <p className="text-lg md:text-xl">
              Send kids on adventures with their favorite characters in a space
              made just for them—free with your membership.
            </p>
          </div>
        </div>
      </div>
      {/* 5th section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto justify-center md:flex-col flex-col px-4 md:px-6">
          <h2 className="text-4xl font-bold text-white mb-12 sm:text-3xl">FAQs</h2>
          <Accordion type="single" collapsible className="w-full rounded-sm">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg md:text-xl bg-neutral-900/80 rounded px-5 py-6 text-left">What is Movix?</AccordionTrigger>
              <AccordionContent className="text-lg md:text-xl px-5 py-6">
                Movix is a streaming service that offers a vast collection of
                award-winning TV shows, movies, anime, documentaries, and much
                more, available on thousands of internet-connected devices. You
                can enjoy unlimited streaming, whenever you want, with no
                commercials – all for one affordable monthly price. There's
                always something new to explore, with new TV shows and movies
                added every week!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg md:text-xl bg-neutral-900/80 rounded px-5 py-6 text-left">Can watch movies in HD quality?</AccordionTrigger>
              <AccordionContent className="text-lg md:text-xl px-5 py-6">
              Yes, Movix offers movies in HD quality, and you can enjoy a high-definition viewing experience on supported devices.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg md:text-xl bg-neutral-900/80 rounded px-5 py-6 text-left">Is there a limit to how much content can watch?</AccordionTrigger>
              <AccordionContent className="text-lg md:text-xl px-5 py-6">
              No, there is no limit. You can watch as much content as you want, whenever you want, without any restrictions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg md:text-xl bg-neutral-900/80 rounded px-5 py-6 text-left">Is customer data safe when using Movix?</AccordionTrigger>
              <AccordionContent className="text-lg md:text-xl px-5 py-6">
              Your privacy and data security are important to us. Movix adheres to industry standards to ensure your information is protected while using the service
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
