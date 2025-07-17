import { Sidebar, SidebarContent, SidebarHeader, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { topicAtom } from "@/atoms/topic";
import { difficultyAtom } from "@/atoms/difficyult";
import { courseOutlineAtom } from "@/atoms/courseoutline";
import type { typeCourseOutline } from "@/atoms/courseoutline";
import { ScrollArea } from "@/components/ui/scroll-area"
import { currentCourseTitleAtom , currentModuleTitleAtom, currentLessonTitleAtom } from "@/atoms/outillne";
import ChapterLoader from "@/components/ui/Loader";

export default function AppSidebar() {
  const [loading, setLoading] = useState(true);
  const topic = useRecoilValue(topicAtom);
  const difficulty = useRecoilValue(difficultyAtom);
  const setCourseOutline = useSetRecoilState(courseOutlineAtom);
  const courseOutline = useRecoilValue(courseOutlineAtom);
  const generateOutline: string | undefined = import.meta.env.VITE_GENERATE_OUTLINE;

  const setCourseTitle = useSetRecoilState(currentCourseTitleAtom);
  const setModuleTitle = useSetRecoilState(currentModuleTitleAtom);
  const setLessonTitle = useSetRecoilState(currentLessonTitleAtom);

  

  useEffect(() => {
    const fetchOutline = async () => {
      try {
        const response = await axios.post<typeCourseOutline>(generateOutline!, {
          topic,
          difficulty,
        });
        setCourseOutline(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching course outline:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOutline();
  }, []);

  if (loading) {
    return <ChapterLoader/>
  }

  return (
    <Sidebar className="bg-zinc-900 border-zinc-700" variant="sidebar">
      <SidebarHeader className="bg-zinc-900 text-white text-xl font-bold px-4 py-2 border-b border-zinc-700">
        {courseOutline?.title}
      </SidebarHeader>
      <SidebarContent className="bg-zinc-900 text-white border-zinc-700">
        <ScrollArea className="h-full custom-scrollbar overflow-y-auto">
          <SidebarMenuItem className="flex flex-col gap-2">
            {courseOutline?.modules.map((module, index) => (
              <SidebarMenuSub key={index}>
                <div className="text-gray-300 font-medium px-4 py-2 hover:bg-zinc-800 hover:text-white transition-colors duration-200 cursor-pointer rounded-sm">
                  {index + 1}. {module.title}
                </div>
                <SidebarMenuSub>
                  {module.lessons.map((lesson, lIndex) => (
                    <SidebarMenuSubItem key={lIndex}>
                      <button onClick={() => {
                        setCourseTitle(courseOutline?.title); 
                        setModuleTitle(module.title); 
                        setLessonTitle(lesson.title)
                        }} className="text-gray-400 px-6 py-1.5 hover:bg-zinc-800 hover:text-gray-200 transition-colors duration-200 cursor-pointer rounded-sm text-sm">
                        {lIndex + 1}. {lesson.title}
                      </button>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarMenuSub>
            ))}
          </SidebarMenuItem>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}