import { useCheckoutTab } from "@/context/CheckoutTabContext";
import { tabsConfig } from "./TabsConfig";

export default function HeaderDesktop() {
  const { activeTab, setActiveTab } = useCheckoutTab();

  return (
    <div className="justify-between hidden md:flex mb-7">
      {tabsConfig.map((tab) => (
        <button
          key={tab.tabIndex}
          onClick={() => setActiveTab(tab.tabIndex)}
          className="flex items-center gap-x-1"
          role="tab"
          aria-selected={activeTab === tab.tabIndex}
        >
          <tab.icon
            sx={{
              color: activeTab === tab.tabIndex ? "#417F56" : "#CBCBCB",
              fontSize: activeTab === tab.tabIndex ? 20 : 18,
            }}
          />
          <p
            className={`text-sm ${
              activeTab === tab.tabIndex
                ? "font-bold text-[#417F56]"
                : "text-[#CBCBCB]"
            }`}
          >
            {tab.label}
          </p>
        </button>
      ))}
    </div>
  );
}
