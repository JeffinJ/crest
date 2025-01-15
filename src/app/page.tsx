import { AnimatedHeroCard } from "@/components/hero-card-animated";

export default function Home() {
  return (
    <div className="flex flex-row h-full items-center justify-center">
      <div className="h-full flex flex-col gap-y-5 items-start justify-center">
        <div className="flex flex-col gap-y-2">
          <AnimatedHeroCard />
        </div>
      </div>
    </div>
  );
}
