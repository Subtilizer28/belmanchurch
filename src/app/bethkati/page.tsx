"use client";
import { useState, useEffect } from "react";
import BethkatiViewer from "~/components/BethkatiReader";

interface Bethkati {
  month: string;
  issueYear: number;
  url: string;
}

export default function Bethkati() {
  const [issues, setIssues] = useState<Bethkati[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  useEffect(() => {
    fetch("/bethkati/issues.json")
      .then((res) => res.json())
      .then((data: Bethkati[]) => {
        setIssues(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center overflow-hidden bg-[url('/bg/home.jpg')] bg-cover bg-center">
        <div className="flex h-screen w-full items-end justify-center bg-black/50 backdrop-blur-sm">
          <div className="mb-5 flex h-[81%] w-[90%] flex-col items-center justify-center text-center text-primary">
            Loading.....
          </div>
        </div>
      </div>
    );
  }

  if (issues.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center overflow-hidden bg-[url('/bg/home.jpg')] bg-cover bg-center">
        <div className="flex h-screen w-full items-end justify-center bg-black/50 backdrop-blur-sm">
          <div className="mb-5 flex h-[81%] w-[90%] flex-col items-center justify-center text-center text-primary">
            No issues available
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {!selectedFile ? (
        <div className="flex h-screen w-full items-center justify-center overflow-hidden bg-[url('/bg/home.jpg')] bg-cover bg-center">
          <div className="flex h-screen w-full items-end justify-center bg-black/50 backdrop-blur-sm">
            <div className="mb-5 flex h-[81%] w-[90%] flex-col items-center justify-center text-center">
              {/* Scrollable Container */}
              <div className="flex w-full items-start justify-center overflow-x-auto p-5">
                <div className="no-scrollbar grid grid-cols-1 gap-10 sm:grid-cols-3 md:grid-cols-4">
                  {issues.map((issue) => (
                    <div
                      key={issue.url}
                      className="flex h-80 w-60 flex-col items-center justify-center gap-3 rounded-3xl bg-secondary p-4 text-textcolor transition-shadow hover:bg-secondary hover:shadow-2xl hover:shadow-primary"
                    >
                      <div className="flex h-40 w-52 rounded-2xl bg-accent text-primary font-bold justify-center items-center">
                        {issue.month} - {issue.issueYear}
                      </div>
                      <div className="">
                        <p className="font-extrabold">Bethkati {issue.issueYear}</p>
                      </div>
                      <button onClick={() => setSelectedFile(issue.url)} className="rounded-xl bg-accent text-primary p-2 px-6 font-extrabold transition-colors hover:bg-primary hover:text-textcolor">
                        Open Bethkati
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen w-full items-center justify-center overflow-hidden bg-[url('/bg/home.jpg')] bg-cover bg-center">
          <div className="flex h-screen w-full items-end justify-center bg-black/50 backdrop-blur-md">
            <div className="flex h-[81%] w-[90%] items-center justify-center">
              <BethkatiViewer
                file={selectedFile}
                onClose={() => setSelectedFile(null)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
