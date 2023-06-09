import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";

import { Editor, OnContentUpdatedParams } from "../components/Editor";
import { ToC } from "../components/ToC";

import { Document as IPCDocument } from "@/shared/types/ipc";

export function Document() {
  const [headings, setHeadings] = useState<string[]>([]);

  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery(["document", id], async () => {
    const response = await window.api.fetchDocument({ id: id! });

    return response.data;
  });

  const { mutateAsync: saveDocument } = useMutation(
    async ({ title, content }: OnContentUpdatedParams) => {
      await window.api.saveDocument({ id: id!, title, content });
    },
    {
      onSuccess: (_, { title }) => {
        queryClient.setQueryData<IPCDocument[]>(["documents"], (documents) => {
          return documents?.map((document) => {
            if (document.id === id) {
              return { ...document, title };
            }
            return document;
          });
        });
      },
    }
  );

  const initialContent = useMemo(() => {
    if (data) {
      return `<h1>${data.title}</h1>${data.content ?? `<p></p>`}`;
    }

    return "";
  }, [data]);

  function handleEditorContentUpdated({
    title,
    content,
  }: OnContentUpdatedParams) {
    saveDocument({ title, content });
  }

  useEffect(() => {
    const getHeadings = /<h[2-6]>(.*?)<\/h[2-6]>/gi;
    const headingsContent = data?.content
      ?.match(getHeadings)
      ?.map((match) => match.replace(/<\/?h\d>/g, ""));

    setHeadings(headingsContent!!);
  }, [data]);

  return (
    <main className="flex-1 flex py-12 px-10 gap-8">
      <aside className="hidden lg:block sticky top-0">
        <span className="text-rotion-300 font-semibold text-xs">
          TABLE OF CONTENTS
        </span>

        <ToC.Root>
          <ToC.Link>{data?.title}</ToC.Link>
          <ToC.Section>
            {headings?.map((heading, index) => (
              <ToC.Link key={`${data?.id} - ${index}`}>{heading}</ToC.Link>
            ))}
          </ToC.Section>
        </ToC.Root>
      </aside>

      <section className="flex-1 flex flex-col items-center">
        {!isFetching && data && (
          <Editor
            onContentUpdated={handleEditorContentUpdated}
            content={initialContent}
          />
        )}
      </section>
    </main>
  );
}
