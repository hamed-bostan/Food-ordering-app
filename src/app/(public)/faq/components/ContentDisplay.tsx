import { ContentDisplayProps } from "@/types/faq.types";
import ContentSection from "./ContentSection";
import { tabDetails } from "@/presentation/constants/faq";

export default function ContentDisplay({ activeTab }: ContentDisplayProps) {
  const filteredSections = tabDetails.filter((section) => section.category === activeTab);

  return (
    <section className="px-5 pt-3 pb-6">
      <ul className="border border-[#CBCBCB] rounded-sm px-0.5">
        {filteredSections.map((section) => (
          <li key={section.id}>
            <ContentSection details={[section]} />
          </li>
        ))}
      </ul>
    </section>
  );
}
