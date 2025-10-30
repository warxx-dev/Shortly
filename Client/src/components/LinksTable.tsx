import { TableCard } from "./TableCard";
import { LinkContext } from "../context/linkContext";
import { useContext } from "react";

export const LinksTable = () => {
  const { links } = useContext(LinkContext);

  if (links.length == 0) return null;

  return (
    <div className="bg-gray-700 text-center rounded-lg p-4 max-w-2xl w-full">
      <h2 className="text-2xl font-semibold pb-2">Your Links</h2>
      <section className="bg-gray-700 rounded-lg flex gap-2 flex-col">
        {links.map((link, index) => (
          <TableCard
            key={index}
            originalLink={link.originalLink}
            shortLink={link.shortLink}
          />
        ))}
      </section>
    </div>
  );
};
