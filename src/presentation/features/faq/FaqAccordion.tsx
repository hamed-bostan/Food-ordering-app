"use client";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { FaqSection } from "@/types/faq.types";

export default function FaqAccordion({ details }: { details: FaqSection[] }) {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className=" text-[#353535]">
      {details.map((item) => (
        <Accordion
          key={item.id}
          expanded={expanded === item.id}
          onChange={handleChange(item.id)}
          disableGutters
          square
          sx={{
            boxShadow: "none",
            borderBottom: "1px solid #CBCBCB",
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              sx={{
                fontSize: { xs: "0.75rem", md: "0.875rem", lg: "1rem" },
                lineHeight: { xs: "1.35rem", md: "1.5rem", lg: "1.75rem" },
              }}
            >
              {item.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              sx={{
                fontSize: { xs: "0.625rem", md: ".875rem", lg: "1rem" },
                lineHeight: { xs: "1.35rem", md: "1.5rem", lg: "1.75rem" },
              }}
            >
              {item.information}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
