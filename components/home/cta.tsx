import Image from "next/image"
import Link from "next/link"

import ctaBg from "@/app/_assets/cta-bg.webp"
import { Button } from "@/components/ui/button"

/**
 * Closing CTA — built from hireloop.fig > Design > Homepage.
 *
 *  Frame:     "Group 2" 1440x964, transparent frame 18px below the Pricing
 *             frame; the Figmas z-order is Pricing < Gradient < Footer < Group 2
 *  Glow:      Homepage child #3 'Gradient' — ELLIPSE 1498x1037 at x=-29 y=+1,
 *             fill radial #5C53FE (1.0 / 0.6 @29% / 0.5 @52% / 0 @100%).
 *             This layer lives OUTSIDE "Group 2", so the cta-bg.webp export
 *             (Group 2 only) never contained it — rebuilt here as CSS radial...
 *             center (611.3, 1) = 42.452% / 0.104%, radii 640.3 x 443.1 px
 *             (44.466% W / 45.958% H). On the #010103 page this is what makes
 *             the dome visible: without it cta-bg.webp is only faint
 *             semi-transparent line art.
 *  Backdrop:  cta-bg.webp grid line art over the glow + the file's
 *             "Rectangle 2" fade (rgba(6,4,11,0) -> opaque #000, decoded
 *             stops: alpha 1.0 at 48.54% of its 837.9px height — solid black
 *             from section y ~578, so the section's lower half fades out; the
 *             footer itself renders globally from app/layout.tsx, right below
 *             this section)
 *  Content:   792px column centered, top inset 153 (desktop)
 *  Title:     Rethink Sans Medium 64, white, 688px wide, two lines
 *  Subcopy:   Manrope Regular 20 white, 16px below the title
 *  Buttons:   48px below the subcopy, 400px row centered (16px gap)
 *             — "Create a free account" 234x58 white r12, #090A15 stroke,
 *               inset white 20% blur 10 y3, Manrope SemiBold 18 #0B0B14
 *             — "View pricing" 150x58 #0E0B16 r12, #D6D6D6 stroke,
 *               inset white 20% blur 10, Manrope Medium 18 white
 *             shadcn <Button> with Base UI render={<Link/>}
 *  Mobile:    stacked buttons, 40px title, tighter insets
 */
export function Cta() {
  return (
    <section
      aria-label="Create your account"
      className="relative isolate mt-[18px] min-h-[640px] overflow-hidden bg-[#010103] md:min-h-[964px]"
    >
      {/* Gradient glow -> BG Grid line art -> Rectangle 2 fade (z: bottom to top) */}
      <div aria-hidden className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(44.466%_45.958%_at_42.452%_0.104%,rgba(92,83,254,1)_0%,rgba(92,83,254,0.6)_29%,rgba(92,83,254,0.5)_52%,rgba(92,83,254,0)_100%)]" />
        <Image
          src={ctaBg}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Rectangle 2 — decoded stops: transparent rgba(6,4,11,0) at the top,
            fully opaque #000 at 48.54% of its height */}
        <div className="absolute inset-x-0 top-[17.8%] h-[86.9%] bg-[linear-gradient(to_bottom,rgba(6,4,11,0)_0%,#000_48.54%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 pt-24 sm:px-6 md:pt-[153px] lg:px-[60px]">
        <div className="mx-auto flex max-w-[792px] flex-col items-center text-center">
          <h2 className="max-w-[688px] font-rethink text-[40px] leading-[1.2] font-medium text-white md:text-[64px] md:leading-[77px]">
            Your next role is
            <br />
            already looking for you
          </h2>
          <p className="mt-4 max-w-[792px] font-display text-lg leading-8 text-white md:text-xl">
            Build a profile in three minutes. The matches start arriving
            tomorrow morning.
          </p>

          <div className="mt-12 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
            <Button
              nativeButton={false}
              render={<Link href="/sign-up" />}
              className="h-[58px] w-full rounded-xl border border-[#090A15] bg-white px-6 font-display text-lg font-semibold text-[#0B0B14] shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-white/90 sm:w-auto"
            >
              Create a free account
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="#pricing" />}
              className="h-[58px] w-full rounded-xl border border-[#D6D6D6] bg-[#0E0B16] px-6 font-display text-lg font-medium text-white shadow-[inset_0_0_10px_rgba(255,255,255,0.2)] hover:bg-[#1A1624] sm:w-auto"
            >
              View pricing
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
