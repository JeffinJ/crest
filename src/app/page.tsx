import { BackgroundLines } from "@/components/background-lines";
import { AnimatedHeroCard } from "@/components/hero-card-animated";
import LinkWithGradient from "@/components/ui/link-with-gradient";

export default function Home() {
  return (
    <BackgroundLines className="flex h-full items-center justify-center">
      <div className="h-full flex flex-col gap-y-2 items-center justify-center">
        <div className="">
          <AnimatedHeroCard />
        </div>
        <div>
          <LinkWithGradient href="/signin">
            <div className="font-semibold text-3xl text-yellow-500 font-RubikVinyl text-center uppercase py-2">
              Try now
            </div>
          </LinkWithGradient>
        </div>
      </div>
    </BackgroundLines>
  );
}
