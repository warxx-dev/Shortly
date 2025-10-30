import { useState, type ReactNode } from "react";
import { LinkContext } from "./linkContext";
import { type Link } from "../types";

export function LinksProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<Link[]>([]);

  return (
    <LinkContext.Provider value={{ links, setLinks }}>
      {children}
    </LinkContext.Provider>
  );
}
