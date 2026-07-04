import { HeroOpening } from "@/components/sections/HeroOpening";
import { OperationalProof } from "@/components/sections/OperationalProof";
import { ScanInstantly } from "@/components/sections/ScanInstantly";
import { VerifyWithConfidence } from "@/components/sections/VerifyWithConfidence";
import { PreventLosses } from "@/components/sections/PreventLosses";
import { GrnMatched } from "@/components/sections/GrnMatched";
import { TasksThatGetDone } from "@/components/sections/TasksThatGetDone";
import { StoreHealthImproves } from "@/components/sections/StoreHealthImproves";
import { TakeControlCta } from "@/components/sections/TakeControlCta";
import { StickyCta } from "@/components/sections/StickyCta";
import { MarqueeBand } from "@/components/motion/MarqueeBand";
import { Faq } from "@/components/sections/Faq";

export default function Home() {
  return (
    <>
      <main id="main-content">
        <HeroOpening />
        <OperationalProof />
        <ScanInstantly />
        <VerifyWithConfidence />
        <PreventLosses />
        <GrnMatched />
        <TasksThatGetDone />
        <StoreHealthImproves />
        <TakeControlCta />
        <MarqueeBand />
        <Faq />
      </main>
      <StickyCta />
    </>
  );
}
