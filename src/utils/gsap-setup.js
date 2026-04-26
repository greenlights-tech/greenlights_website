import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";

// Registreer alles centraal
gsap.registerPlugin(useGSAP, Flip, ScrollTrigger, ScrollSmoother, SplitText, MorphSVGPlugin, DrawSVGPlugin);

export * from "gsap";
export { useGSAP, Flip, ScrollTrigger, ScrollSmoother, SplitText, MorphSVGPlugin, DrawSVGPlugin };
export default gsap;
