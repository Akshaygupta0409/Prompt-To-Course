"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/ui/Loader";
import AppSidebar from "../components/appsidebar";
import { topicAtom } from "@/atoms/topic";
import { difficultyAtom } from "@/atoms/difficyult";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { courseOutlineAtom } from "@/atoms/courseoutline";
import type { typeCourseOutline } from "@/atoms/courseoutline";

import LessonViewer from "../components/RenderContent";

const CoursePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const topic = useRecoilValue(topicAtom);
  const difficulty = useRecoilValue(difficultyAtom);
  const courseOutline = useRecoilValue(courseOutlineAtom);
  const setCourseOutline = useSetRecoilState(courseOutlineAtom);
  // get the generate outline from the environment variable
  const generateOutline: string | undefined = import.meta.env.VITE_GENERATE_OUTLINE;
  useEffect(() => {
    const fetchCourseOutline = async () => {
      try {
        const response = await axios.post<typeCourseOutline>(
         generateOutline!,
          { topic, difficulty }
        );
        setCourseOutline(response.data);
      } catch (error) {
        console.error("Error fetching course outline:", error);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if we don't already have course data
    if (topic || difficulty) {
      fetchCourseOutline();
    } else {
      setLoading(false);
    }
  }, [topic, difficulty]);

  if (loading) {
    return <Loader />;
  }
  // main logic of hte page is here 
  return (
    <div className="flex h-screen bg-zinc-900">
      {courseOutline && <AppSidebar course={courseOutline} />}
      <main className="flex-1 overflow-y-auto">
        {/* Main content area */}
        <LessonViewer />
      </main>
    </div>
  );
};

export default CoursePage;