import { createContext } from "react";
import type { Link } from "../types";

interface LinksContextType {
  links: Link[];
  setLinks: (value: Link[]) => void;
}

export const LinkContext = createContext<LinksContextType>({
  links: [],
  setLinks: () => {},
});
