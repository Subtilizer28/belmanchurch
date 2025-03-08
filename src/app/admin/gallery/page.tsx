"use client"
import { useState } from "react";
import Button from "~/components/Button";

export default function AdminGallery() {
  const [images, setImages] = useState<File[]>([]);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const formatEventName = (name: string) => {
    return name.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden bg-[url('/bg/admin.jpg')] bg-cover bg-center">
      <div className="flex h-screen w-full items-end justify-center bg-black/40 backdrop-blur-sm">
        <div className="mb-5 flex h-[81%] w-[90%] flex-col items-center justify-center text-center">
          <div className="grid md:grid-cols-3 gap-4 p-4 w-full max-w-5xl">
            {/* Upload Box */}
            <div className="group relative w-full">
              <div className="relative overflow-hidden rounded-2xl bg-primary shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/10">
                <div className="relative p-6">
                    <div className="relative rounded-xl border-2 border-dashed border-accent bg-secondary/50 p-8 transition-colors group-hover/dropzone:border-cyan-500/50">
                      <input
                        type="file"
                        className="absolute inset-0 z-50 h-full w-full cursor-pointer opacity-0"
                        multiple
                        onChange={handleFileUpload}
                      />
                      <div className="space-y-6 text-center">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
                          <svg
                            className="h-10 w-10 text-textcolor"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            ></path>
                          </svg>
                        </div>
                        <div className="space-y-2">
                          <p className="text-base font-medium text-textcolor">Drop your files here or browse</p>
                          <p className="text-sm text-textcolor">Support files: JPG, PNG</p>
                          <p className="text-xs text-textcolor">Max file size: 10MB</p>
                          <p className="mt-2 text-sm text-textcolor">Number of Images: {images.length}</p>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Info */}
            <div className="flex flex-col p-4 space-y-8 justify-center items-center">
              <input
                type="text"
                placeholder="Event Name"
                value={eventName}
                onChange={(e) => setEventName(formatEventName(e.target.value))}
                className="h-[25%] md:h-[18%] w-[80%] rounded-full placeholder-textcolor bg-primary text-xl border-2 border-accent/50 p-4 focus:text-textcolor focus:border-accent focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="date"
                placeholder="DD/MM/YYYY"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="h-[25%] md:h-[18%] w-[80%] rounded-full placeholder-textcolor bg-primary text-xl border-2 border-accent/50 p-4 focus:text-textcolor focus:border-accent focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-8 justify-center items-center">
              <Button>Publish</Button>
              <Button variant="destructive">Discard</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
