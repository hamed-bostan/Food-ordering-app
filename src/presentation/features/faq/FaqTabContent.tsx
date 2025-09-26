import { faqSectionsData } from "@/presentation/constants/faq.constants";
import FaqAccordion from "./FaqAccordion";
import { FaqTabContentProps } from "@/types/faq.types";

export default function FaqTabContent({ activeTab }: FaqTabContentProps) {
  const filteredSections = faqSectionsData.filter((section) => section.category === activeTab);

  return (
    <section className="px-5 pt-3 pb-6">
      <ul className="border border-[#CBCBCB] rounded-sm px-0.5">
        {filteredSections.map((section) => (
          <li key={section.id}>
            <FaqAccordion details={[section]} />
          </li>
        ))}
      </ul>
    </section>
  );
}
