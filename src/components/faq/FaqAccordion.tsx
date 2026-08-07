"use client";

import { useMemo, useState } from "react";
import { faqs } from "@/content/faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function FaqAccordion() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(faqs.map((f) => f.category))];

  const filtered = useMemo(() => {
    return faqs.filter((f) => {
      const matchCat = category === "All" || f.category === category;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, category]);

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search FAQ…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full border px-3 py-1 text-xs ${
                category === cat ? "border-primary text-primary" : "border-border text-muted-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {filtered.map((f) => (
          <AccordionItem key={f.id} value={f.id}>
            <AccordionTrigger>{f.question}</AccordionTrigger>
            <AccordionContent>{f.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
