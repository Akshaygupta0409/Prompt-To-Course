"use client";

import { currentLessonTitleAtom } from "@/atoms/outillne";
import { useEffect, useState, type JSX, useRef } from "react";
import { useRecoilValue } from "recoil";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { topicAtom } from "@/atoms/topic";

export default function VideosRender(): JSX.Element {
  const [videos, setVideos] = useState<string[]>([]);
  const lessonTitle = useRecoilValue(currentLessonTitleAtom);
  const topic = useRecoilValue(topicAtom);
  const apikey: string | undefined = import.meta.env.VITE_YOUTUBE_API_KEY;
  const baserurl = "https://www.googleapis.com/youtube/v3/search";
  const videoMap = useRef<Map<string, string[]>>(new Map());

  // running the side effect

  useEffect(() => {
    const controller = new AbortController();
    // function to fetch videos
    const fetchVideosComprehensive = async () => {
      if (!lessonTitle) return;

      try {
        // Step 1: Get videos with duration info
        const searchParams = {
          key: apikey,
          part: "snippet",
          maxResults: 20,
          q: `${topic} ${lessonTitle} tutorial explanation -shorts`,
          type: "video",
          videoDuration: "long",
          order: "relevance",
        };

        const searchResponse = await axios.get(
          `${baserurl}?${new URLSearchParams(searchParams as any)}`,
          {
            signal: controller.signal,
          }
        );
        const searchData = await searchResponse.data;

        if (searchData.items.length === 0) {
          console.log("No videos found");
          return;
        }

        // Step 2: Get detailed info including duration
        const finalVideoIds = searchData.items.map(
          (item: any) => item.id.videoId
        );

        setVideos(finalVideoIds);
        videoMap.current.set(lessonTitle, finalVideoIds);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled");
          return;
        }
        console.error("Error fetching videos:", error);
      }
    };

    let videoIdsFound = false;
    videoMap.current.forEach((value, key) => {
      if (key === lessonTitle) {
        videoIdsFound = true;
        setVideos(value);
      }
    });
    if (videoIdsFound === false) {
      fetchVideosComprehensive();
    }

    return () => {
      controller.abort();
    };
  }, [lessonTitle]);

  if (!lessonTitle) {
    return (
      <div className="flex items-center justify-center h-64 bg-neutral-900">
        <div className="text-center">
          <p className="text-gray-300 text-sm p-2">
            Choose a lesson from the sidebar to view its content.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center overflow-y-auto h-screen ">
      <div className="flex justify-center items-center text-sm font-bold text-gray-100 mb-4 max-w-xs px-2 text-center break-words">
        {lessonTitle}
      </div>
      <ScrollArea className="h-screen overflow-y-auto">
        <div className="flex flex-col justify-center items-center mb-4">
          {videos?.map((videoId) => (
            <div
              key={videoId}
              className="cursor-pointer mb-4 relative group"
              onClick={() =>
                window.open(
                  `https://www.youtube.com/watch?v=${videoId}`,
                  "_blank"
                )
              }
            >
              <iframe
                width="260"
                height="160"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="pointer-events-none"
              />

              <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Click to open in new tab
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
