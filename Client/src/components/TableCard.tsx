import { Copy, Trash2 } from "lucide-react";
import { Button } from "./Button";

interface TableCardProps {
  originalLink: string;
  shortLink: string;
}

export const TableCard = ({ originalLink, shortLink }: TableCardProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(shortLink);
  };

  const handleDelete = () => {
    // Lógica para eliminar el enlace
    console.log("Eliminar enlace:", shortLink);
  };

  return (
    <article className="flex flex-col justify-between rounded-lg items-center gap-2 bg-gray-600 p-4 max-w sm:flex-row">
      <section className="flex flex-col items-start">
        <h3 className="text-xs text-gray-300 font-medium">Original URL</h3>
        <p className="truncate max-w-48" title={originalLink}>
          {originalLink}
        </p>
      </section>
      <section className="flex flex-col items-start">
        <h3 className="text-xs text-gray-300 font-medium">Short URL</h3>
        <a
          href={shortLink}
          rel="noopener noreferrer"
          title={shortLink}
          className="text-blue-400 hover:underline hover:cursor-pointer"
          target="_blank"
        >
          {shortLink}
        </a>
      </section>
      <nav className="flex gap-2" aria-label="Acciones del enlace">
        <Button
          icon={<Copy />}
          onClick={handleCopy}
          aria-label="Copiar enlace corto al portapapeles"
          //   title="Copiar enlace"
        />
        <Button
          icon={<Trash2 />}
          onClick={handleDelete}
          aria-label="Eliminar enlace corto"
          //   title="Eliminar enlace"
        />
      </nav>
    </article>
  );
};
