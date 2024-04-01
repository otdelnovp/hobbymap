import { Coffee } from "lucide-react";
import { Metadata } from "next";

import { ContentWrapper } from "@/shared/ui/content-wrapper";

export const metadata: Metadata = {
  title: "About",
};

interface About {
  name: string;
  value: string | { title: string | React.ReactNode; link: string };
}

export default function AboutPage() {
  const aboutMe: About[] = [
    { name: "name", value: "Pavel Otdelnov" },
    { name: "role", value: "OWNER" },
    { name: "hobby", value: "DRONE" },
    { name: "position", value: "fullstack-developer" },
    {
      name: "telegram",
      value: { title: "@otdelnov", link: "https://t.me/otdelnov" },
    },
    {
      name: "instagram",
      value: { title: "@angryprops", link: "https://instagram.com/angryprops" },
    },
    {
      name: "donate",
      value: {
        title: (
          <>
            <Coffee className="ml-0.5 mr-1 h-4 w-4 inline-block" />
            buy me a coffee
          </>
        ),
        link: "https://www.buymeacoffee.com/otdelnov",
      },
    },
  ];

  const aboutRowTemplate = (row: About) => (
    <p key={row.name} className="ml-8">
      {row.name}:
      <span className="text-yellow-300 ml-1">
        {typeof row.value === "string" ? (
          `"${row.value}",`
        ) : (
          <>
            {'"'}
            <a
              href={row.value.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-300 underline focus:border-none underline-offset-4"
            >
              {row.value.title}
            </a>
            {'",'}
          </>
        )}
      </span>
    </p>
  );

  return (
    <ContentWrapper>
      <div className="rounded-lg shadow-xl bg-gray-900 text-white w-full max-w-[600px] m-auto">
        <div className="border-b border-gray-800 px-8 py-3">
          <div className="inline-block w-3 h-3 mr-2 rounded-full bg-red-500"></div>
          <div className="inline-block w-3 h-3 mr-2 rounded-full bg-yellow-300"></div>
          <div className="inline-block w-3 h-3 mr-2 rounded-full bg-green-400"></div>
        </div>
        <div className="px-8 py-6">
          <p>
            <em className="text-blue-400 mr-2">const</em>
            <span className="text-green-400 mr-1">aboutMe</span>
            <span className="text-pink-500 mr-1">=</span>
            <em className="text-blue-400 mr-1">function</em>
            {"() {"}
          </p>
          <p>
            <span className="text-pink-500 ml-4 mr-2">return</span>
            {"{"}
          </p>
          {aboutMe.map((row) => aboutRowTemplate(row))}
          <p className="ml-4">{"}"}</p>
          <p>{"}"}</p>
        </div>
      </div>
    </ContentWrapper>
  );
}
