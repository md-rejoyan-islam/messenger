import Footer from "@/components/shared/home-footer";
import HomeHeader from "@/components/shared/home-header";
import { Button } from "@/components/ui/button";
import { FadeIn, SlideIn } from "@/components/ui/transitions";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const isAuthenticated = false;

  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <HomeHeader />

        {/* Hero section */}
        <section className="flex-1 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <SlideIn direction="up">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-messenger-black">
                  Connect with your friends instantly
                </h1>
                <p className="text-xl text-messenger-dark-grey mb-8">
                  Simple, reliable, private messaging with a clean interface.
                  Keep in touch with the people who matter most.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  {isAuthenticated ? (
                    <Button
                      size="lg"
                      className="bg-messenger-blue hover:bg-messenger-light-blue"
                      asChild
                    >
                      <Link href="/messages">
                        Go to Messages
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  ) : (
                    <>
                      <Button
                        size="lg"
                        className="bg-messenger-blue hover:bg-messenger-light-blue"
                        asChild
                      >
                        <Link href="/register">
                          Get Started
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                      <Button size="lg" variant="outline" asChild>
                        <Link href="/login">Log in</Link>
                      </Button>
                    </>
                  )}
                </div>
              </SlideIn>
            </div>

            <div className="md:w-1/2">
              <FadeIn delay={0.2}>
                <div className="relative">
                  <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl transform rotate-3 scale-95"></div>
                  <div className="bg-white rounded-3xl shadow-2xl overflow-hidden p-4 relative z-10">
                    <div className="flex items-center space-x-3 border-b pb-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-messenger-blue flex items-center justify-center">
                        <MessageCircle className="text-white w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Messenger</h3>
                        <p className="text-xs text-messenger-dark-grey">
                          Connected
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-start">
                        <div className="bg-messenger-grey text-messenger-black rounded-2xl py-2 px-4 max-w-xs">
                          <p>Hey! How are you doing?</p>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <div className="bg-messenger-blue text-white rounded-2xl py-2 px-4 max-w-xs">
                          <p>
                            I&apos;m doing great! Just checking out this new
                            messenger app.
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-start">
                        <div className="bg-messenger-grey text-messenger-black rounded-2xl py-2 px-4 max-w-xs">
                          <p>It looks amazing! So clean and minimal.</p>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <div className="bg-messenger-blue text-white rounded-2xl py-2 px-4 max-w-xs">
                          <p>Absolutely! The animations are so smooth too.</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 bg-messenger-light-grey rounded-full py-2 px-4 focus:outline-none"
                      />
                      <Button
                        size="sm"
                        className="ml-2 bg-messenger-blue hover:bg-messenger-light-blue rounded-full w-8 h-8 p-0"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
