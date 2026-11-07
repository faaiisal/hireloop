import Image from "next/image"
import Link from "next/link"

import ctaBg from "@/app/_assets/cta-bg.webp"

/**
 * CTA — Fixed based on Figma crop (2nd screenshot):
 * Problem before: min-h-[640]/[964] + Rectangle 2 fade covering 48% created
 *  ~400-500px black empty gap between buttons and footer. The fig has Group 2
 *  1440x964 but its fade is inside the frame; when rendered as separate section
 *  + global footer, that black space doubles.
 * Fix: Removed min-h, set content-driven height. Top padding 140/168 centers
 *  title inside dome, bottom padding only 72/96 so footer starts right after
 *  buttons. Glow kept at top (1498x1037 radial), grid is screen-blended with
 *  controlled opacity, fades trimmed to 62% height to avoid large black bottom.
 */
export function Cta() {
  return (
    <section
      aria-label="Create your account"
      className="relative isolate overflow-hidden bg-[#010103]"
    >
      {/* Background: purple ellipse glow + wireframe grid + subtle fades */}
      <div aria-hidden className="absolute inset-0 z-0">
        {/* Purple glow — 1498x1037 ellipse from fig Gradient */
        /* centered at 42.45% 0.1%, exact fig colors */}
        <div className="absolute left-1/2 top-0 h-[760px] w-[122%] max-w-[1498px] -translate-x-[48%]">
          <div className="absolute inset-0 bg-[radial-gradient(44.5%_46%_at_42.5%_0%,rgba(92,83,254,1)_0%,rgba(92,83,254,0.6)_29%,rgba(92,83,254,0.45)_52%,rgba(92,83,254,0)_78%)]" />
        </div>
        <Image
          src={ctaBg}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top opacity-[0.62]"
          priority={false}
        />
        {/* Top ink to hide grid hard top */}
        <div className="absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-[#010103] to-transparent" />
        {/* Bottom fade — trimmed: now starts at 52% and fills only rest, not 86% */
        /* prevents large black empty area causing footer gap */}
        <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#010103] via-[#010103]/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(72%_60%_at_50%_16%,transparent_38%,#010103_86%)]" />
      </div>

      {/* Content — Fig: 792px column centered, no extra bottom gap */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 pb-[72px] pt-[112px] sm:px-6 md:pb-[88px] md:pt-[168px] lg:px-[60px]">
        <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
          <h2 className="max-w-[640px] font-rethink text-[34px] font-medium leading-[1.05] tracking-[-0.02em] text-white sm:text-[42px] md:text-[56px] md:leading-[1.02]">
            Your next role is
            <br />
            already looking for you
          </h2>
          <p className="mt-[14px] max-w-[520px] font-display text-[14px] leading-[22px] text-white/55 md:text-[15px]">
            Build a profile in three minutes. The matches start arriving tomorrow morning.
          </p>

          <div className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/sign-up"
              className="inline-flex h-[42px] w-full items-center justify-center rounded-[12px] bg-white px-5 font-display text-[13.5px] font-semibold tracking-[-0.01em] text-[#0B0B14] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_4px_12px_rgba(255,255,255,0.08)] transition hover:bg-white/90 sm:w-auto"
            >
              Create a free account
            </Link>
            <Link
              href="#pricing"
              className="inline-flex h-[42px] w-full items-center justify-center rounded-[12px] border border-white/15 bg-[#111113] px-5 font-display text-[13.5px] font-medium text-white/90 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition hover:bg-white/[0.08] sm:w-auto"
            >
              View pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
