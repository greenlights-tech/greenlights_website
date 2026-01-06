import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

// Registreer alles centraal
gsap.registerPlugin(useGSAP, Flip, ScrollTrigger, ScrollSmoother, SplitText);

export * from "gsap";
export { useGSAP, Flip, ScrollTrigger, ScrollSmoother, SplitText };
export default gsap;
