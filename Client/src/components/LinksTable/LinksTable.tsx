import { TableCard } from "./TableCard";
import { LinkContext } from "../../context/linkContext";
import { useContext, useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import empty_table from "./assets/empty_table.webp";
import { useAuth } from "../../hooks/useAuth";

export const LinksTable = () => {
  const { links, setLinks } = useContext(LinkContext);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetch(`http://localhost:3000/link?email=${user?.email}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setLinks(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching links:", error);
      });
  }, [setLinks, user?.email]);
  console.log(links);

  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(-20px)" }}
      animate={{ opacity: 1, transform: "translateY(0px)" }}
      exit={{ opacity: 0, transform: "translateY(20px)" }}
      transition={{ duration: 0.3 }}
      className="text-center flex flex-col justify-center rounded-lg p-4 max-w-2xl w-full"
    >
      {isLoading ? (
        <div className="text-slate-400">Loading...</div>
      ) : links.length != 0 ? (
        <>
          <h2 className="text-2xl font-semibold pb-2 flex items-center gap-2">
            <BarChart3 className="text-emerald-400" />
            Manage your Links
          </h2>
          <section className="rounded-lg flex gap-2 flex-col">
            {links.map((link) => {
              return (
                <TableCard
                  id={link.id}
                  key={link.code}
                  code={link.code}
                  originalLink={link.originalLink}
                  shortLink={`http://localhost:3000/${link.code}`}
                  clicks={link.clicks}
                  date={new Date(link.createdAt).toLocaleDateString()}
                />
              );
            })}
          </section>
        </>
      ) : (
        <img src={empty_table} width={400} />
      )}
    </motion.div>
  );
};
