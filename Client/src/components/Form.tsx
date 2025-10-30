import { useContext, useEffect } from "react";
import { AlertContext } from "../context/alertContext";
import { Input } from "./Input";
import { Button } from "./Button";
import { LinkContext } from "../context/linkContext";
import { LinkIcon, ScissorsIcon } from "lucide-react";
import { FormWarning } from "./FormWarning";

export const Form = () => {
  const { showAlert, setShowAlert } = useContext(AlertContext);
  const { links, setLinks } = useContext(LinkContext);

  useEffect(() => {
    if (showAlert) {
      console.log("Estado actualizado:", showAlert);
    }
  }, [showAlert]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const originalLink = formData.get("originalUrl")?.toString() ?? "";
    const customName = formData.get("customName")?.toString() ?? "";

    try {
      const res = await fetch("http://localhost:3000/link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalLink,
          code: customName,
        }),
      });

      if (res.ok) {
        setShowAlert(true);
        setLinks([
          ...links,
          { originalLink, shortLink: `shortly.com/${customName}` },
        ]);
        form.reset();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-700/30 w-full max-w-2xl flex flex-col items-start p-8 rounded-2xl gap-2.5"
    >
      <div className="flex items-center gap-2 pb-2.5">
        <LinkIcon className="text-emerald-400" />
        <h2 className="text-2xl font-bold">Shorten URL</h2>
      </div>
      <FormWarning />

      <Input
        required
        placeholder="https:/example.com/a-very-long-link"
        name="originalUrl"
        text="Original URL"
      ></Input>
      <Input
        placeholder="my-custom-link"
        name="customName"
        text="Custom name (optional)"
      ></Input>

      <p className="text-gray-400 pb-2">
        *If you do not specify a name, it will be generated automatically.
      </p>

      <Button
        text="Shorten Link"
        type="submit"
        icon={<ScissorsIcon size={16}></ScissorsIcon>}
        className="w-full"
      />
    </form>
  );
};
