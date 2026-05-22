import Image from "next/image";
import { aboutData } from "../landingData";

export default function AboutUs() {
  const { sectionLabel, heading, body } = aboutData;

  return (
    <section id="about" className="w-full bg-white  px-4 py-0">
      <div className="mx-auto grid max-w-[1530px] gap-9 sm:gap-12 lg:grid-cols-[0.98fr_1fr] lg:gap-16 xl:gap-20">
        <div className="relative mx-auto w-full max-w-[760px] lg:ml-0">
          <Image
            src="https://crestwood-academy.eschool-saas.wrteam.me/storage/12/school-settings/6683ebbb74e6b4.747441831719921595.png"
            alt="Teachers helping young students learn"
            width={560}
            height={410}
            priority
            sizes="(min-width: 1280px) 720px, (min-width: 1024px) 48vw, 92vw"
            className="h-auto w-2/3 object-contain mx-auto"
          />
        </div>

        <div className="w-full relative max-w-[720px]">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-10 w-1 rounded-full bg-[#279689]" />
            <span className="text-lg font-semibold leading-none text-[#279689]">
              {sectionLabel}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a2d45] leading-tight mb-4">
            {heading}
          </h2>

          <p className="max-w-[690px] text-base font-medium leading-7 tracking-normal text-[#5E6470] sm:text-[17px]">
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}
