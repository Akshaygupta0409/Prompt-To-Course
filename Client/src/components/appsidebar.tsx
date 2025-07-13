'use client';

import * as React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSetRecoilState } from "recoil";
import {
  currentCourseTitleAtom,
  currentModuleTitleAtom,
  currentLessonTitleAtom,
} from "@/atoms/outillne";

// Types
type Lesson = {
  title: string;
};

type Module = {
  title: string;
  lessons: Lesson[];
};

type CourseOutline = {
  title: string;
  modules: Module[];
};

interface AppSidebarProps {
  course: CourseOutline | null;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ course }) => {
  const setCourseTitle = useSetRecoilState(currentCourseTitleAtom);
  const setModuleTitle = useSetRecoilState(currentModuleTitleAtom);
  const setLessonTitle = useSetRecoilState(currentLessonTitleAtom);

  React.useEffect(() => {
    if (course) {
      setCourseTitle(course.title);
    }
  }, [course, setCourseTitle]);

  if (!course) return null;

  const handleLessonClick = (moduleTitle: string, lessonTitle: string) => {
    setModuleTitle(moduleTitle);
    setLessonTitle(lessonTitle);
  };

  return (
    <aside className="w-full max-w-sm h-screen bg-zinc-900 text-gray-200 p-4 font-sans flex flex-col">
      <h1 className="text-xl font-bold mb-6 text-white flex-shrink-0">{course.title}</h1>
      <div className="flex-1 overflow-y-auto pr-2 -mr-2 scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-600 hover:scrollbar-thumb-zinc-500">
        <Accordion type="multiple" className="space-y-2">
        {course.modules.map((module, moduleIndex) => (
          <AccordionItem key={moduleIndex} value={`module-${moduleIndex}`} className="border-b border-zinc-700">
            <AccordionTrigger className="text-left text-base font-semibold text-gray-300 hover:text-white transition-colors">
              {`Module ${moduleIndex + 1}: ${module.title}`}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside space-y-1 pl-4">
                {module.lessons.map((lesson, lessonIndex) => (
                  <li
                    key={lessonIndex}
                    className="cursor-pointer text-gray-400 hover:text-white hover:underline transition-colors"
                    onClick={() => handleLessonClick(module.title, lesson.title)}
                  >
                    {lessonIndex + 1}. {lesson.title}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
        </Accordion>
      </div>
    </aside>
  );
};

export default AppSidebar;
