"use client"

import { currentCourseTitleAtom, currentLessonTitleAtom } from "@/atoms/outillne";
import { useEffect, useState, type JSX, useRef } from "react"
import { useRecoilValue } from "recoil";
import { ScrollArea } from "@/components/ui/scroll-area"
import axios from "axios";

export default function VideosRender(): JSX.Element {
  const [videos, setVideos] = useState<string[]>([]);
  const lessonTitle = useRecoilValue(currentLessonTitleAtom);
  const topic = useRecoilValue(currentCourseTitleAtom);
  const apikey : string = import.meta.env.VITE_YOUTUBE_API_KEY;
  const baserurl = "https://www.googleapis.com/youtube/v3/search";
  const videoMap = useRef<Map<string, string[]>>(new Map());

  // running the side effect 

  useEffect(() => {
    // function to fetch videos
    const fetchVideos = async () => {
      if (!lessonTitle) return;

      const params: any = {
        key: apikey,
        part: "snippet",
        type: "video",
        maxResults: 25,
        
        q: ` ${topic} ${lessonTitle} `,
      };
      const response = await axios.get(`${baserurl}?${new URLSearchParams(params)}`);
      const data = await response.data;
      const videoIds = data.items.map((item: any) => item.id.videoId);
      setVideos(videoIds);
      videoMap.current.set(lessonTitle, videoIds);
    };
    let videoIdsFound = false;
    videoMap.current.forEach((value, key) => {
      if (key === lessonTitle) {
        videoIdsFound = true;
        setVideos(value);
      }
    });
    if (videoIdsFound === false) {
      fetchVideos();
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
