import { useCheckoutTab } from "@/context/CheckoutTabContext";
import { tabsConfig } from "./TabsConfig";

export default function HeaderDesktop() {
  const { activeTab, setActiveTab } = useCheckoutTab();

  return (
    <div className="hidden md:flex justify-between mb-7">
      {tabsConfig.map((tab) => (
        <div
          key={tab.tabIndex}
          onClick={() => setActiveTab(tab.tabIndex)}
          className="flex gap-x-1 cursor-pointer items-center"
        >
          <tab.icon
            sx={{
              color: activeTab === tab.tabIndex ? "#417F56" : "#CBCBCB",
              fontSize: activeTab === tab.tabIndex ? 20 : 18,
            }}
          />
          <span
            className={`text-sm ${
              activeTab === tab.tabIndex
                ? "font-bold text-[#417F56]"
                : "text-[#CBCBCB]"
            }`}
          >
            {tab.label}
          </span>
        </div>
      ))}
    </div>
  );
}
