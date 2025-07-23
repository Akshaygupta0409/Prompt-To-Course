"use client"

import { currentLessonTitleAtom } from "@/atoms/outillne";
import { useEffect, useState, type JSX, useRef } from "react"
import { useRecoilValue } from "recoil";
import { ScrollArea } from "@/components/ui/scroll-area"
import axios from "axios";
import { topicAtom } from "@/atoms/topic";

export default function VideosRender(): JSX.Element {
  const [videos, setVideos] = useState<string[]>([]);
  const lessonTitle = useRecoilValue(currentLessonTitleAtom);
  const topic = useRecoilValue(topicAtom);
  const apikey: string = import.meta.env.VITE_YOUTUBE_API_KEY;
  const baserurl = "https://www.googleapis.com/youtube/v3/search";
  const videoMap = useRef<Map<string, string[]>>(new Map());

  // running the side effect 

  useEffect(() => {
    // function to fetch videos
    const fetchVideosComprehensive = async () => {
      if (!lessonTitle) return;

      try {
        // Step 1: Get videos with duration info
        const searchParams = {
          key: apikey,
          part: "snippet",
          maxResults: 20, // Get more to filter from
          q: `${topic} ${lessonTitle} tutorial explanation -shorts`,
          type: "video",
          videoDuration: "medium", // 4-20 minutes
          order: "relevance",
        };

        const searchResponse = await axios.get(`${baserurl}?${new URLSearchParams(searchParams as any)}`);
        const searchData = await searchResponse.data;

        if (searchData.items.length === 0) {
          console.log("No videos found");
          return;
        }

        // Step 2: Get detailed info including duration
        const finalVideoIds = searchData.items.map((item: any) => item.id.videoId);

        setVideos(finalVideoIds);
        videoMap.current.set(lessonTitle, finalVideoIds);
      } catch (error) {
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
  }, [lessonTitle]);


  return (
    <div className="flex flex-col justify-center items-center overflow-y-auto h-screen ">
      <ScrollArea className="h-screen overflow-y-auto">
      

        <div className="flex flex-col justify-center items-center mb-4">
          {videos?.map((videoId) => (
            <div
              key={videoId}
              className="cursor-pointer mb-4 relative group"
              onClick={() => window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')}
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


  )
}
