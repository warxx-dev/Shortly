import { TableCard } from "./TableCard";
import { LinkContext } from "../../context/linkContext";
import { useContext, useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import empty_table from "./assets/empty_table.webp";
import { Spinner } from "flowbite-react";
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
        console.log(response);
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

  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(-20px)" }}
      animate={{ opacity: 1, transform: "translateY(0px)" }}
      exit={{ opacity: 0, transform: "translateY(20px)" }}
      transition={{ duration: 0.3 }}
      className="text-center flex flex-col justify-center rounded-lg p-4 max-w-2xl w-full"
    >
      {links.length != 0 ? (
        isLoading ? (
          //TODO : fix animation spinner
          <Spinner
            size="xl"
            aria-label="Loading links..."
            className="mx-auto mt-10 animate-spin"
          />
        ) : (
          <>
            <h2 className="text-2xl font-semibold pb-2 flex items-center gap-2">
              <BarChart3 className="text-emerald-400" />
              Manage your Links
            </h2>
            <section className="rounded-lg flex gap-2 flex-col">
              {links.map((link, index) => (
                <TableCard
                  key={index}
                  originalLink={link.originalLink}
                  shortLink={`http://localhost:3000/${link.code}`}
                />
              ))}
            </section>
          </>
        )
      ) : (
        <img src={empty_table} width={400} />
      )}
    </motion.div>
  );
};
