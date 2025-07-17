// components/LessonViewer.tsx
"use client";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import ReactMarkdown from "react-markdown";
import { currentLessonTitleAtom } from "@/atoms/outillne";
import { currentModuleTitleAtom } from "@/atoms/outillne";
import { currentCourseTitleAtom } from "@/atoms/outillne";
import axios from "axios";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { ScrollArea } from "@radix-ui/react-scroll-area";



interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function LessonViewer() {
    const [content, setContent] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const lessonTitle = useRecoilValue(currentLessonTitleAtom);
    const moduleTitle = useRecoilValue(currentModuleTitleAtom);
    const courseTitle = useRecoilValue(currentCourseTitleAtom);
    const generateLesson: string | undefined = import.meta.env.VITE_GENERATE_LESSON;
    
    // Debug logging
    console.log("LessonViewer render:", { lessonTitle, moduleTitle, courseTitle });
    
    useEffect(() => {
        // More strict validation - check for meaningful content, not just truthy values
        const isValidTitle = (title: string | null): title is string => {
            return title !== null && title.trim().length > 0;
        };
        
        if (!isValidTitle(lessonTitle) || !isValidTitle(moduleTitle) || !isValidTitle(courseTitle)) {
            console.log("Skipping API call - invalid titles:", { lessonTitle, moduleTitle, courseTitle });
            setContent("");
            setLoading(false);
            return;
        }

        console.log("Making API call with:", { lessonTitle, moduleTitle, courseTitle });

        const fetchLessonContent = async () => {
            try {
                setLoading(true);
                const response = await axios.post(generateLesson!, { 
                    lesson_title: `${courseTitle}, ${moduleTitle}, ${lessonTitle}`
                });
                setContent(response.data.content);
            } catch (error) {
                console.error("Error fetching lesson content:", error);
                setContent("Error loading lesson content. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        
        fetchLessonContent();
    }, [lessonTitle, moduleTitle, courseTitle]);

    // More strict validation for rendering
    const isValidTitle = (title: string | null): title is string => {
        return title !== null && title.trim().length > 0;
    };
    
    if (!isValidTitle(lessonTitle) || !isValidTitle(moduleTitle) || !isValidTitle(courseTitle)) {
        return (
            <div className="flex items-center justify-center h-64 bg-neutral-900">
                <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-100 mb-2">
                        Select a Lesson
                    </h3>
                    <p className="text-gray-300">
                        Choose a lesson from the sidebar to view its content.
                    </p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center bg-neutral-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                    <h1 className="text-lg font-medium text-gray-200">Generating Lesson.....</h1>
                    <br></br>
                    <h1 className="text-lg font-medium text-gray-200">{lessonTitle}</h1>
                    <p className="text-sm text-gray-400 mt-2">This may take up to 30 seconds</p>
                </div>
            </div>
        );
    }
  return (
    <div className="h-full p-8 bg-neutral-900 text-base">
      <ScrollArea className="h-full custom-scrollbar overflow-y-auto">    
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ node, ...props }) => (
            <h1
              {...props}
              className="text-3xl font-bold mt-4 mb-3 text-gray-100"
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              {...props}
              className="text-2xl font-semibold mt-6 mb-2 text-gray-100"
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              {...props}
              className="text-xl font-semibold mt-4 mb-2 text-gray-100"
            />
          ),
          p: ({ node, ...props }) => (
            <p {...props} className="mb-4 text-base text-gray-200 leading-relaxed" />
          ),
          ul: ({ node, ...props }) => (
            <ul {...props} className="list-disc pl-6 mb-4 text-gray-200" />
          ),
          ol: ({ node, ...props }) => (
            <ol {...props} className="list-decimal pl-6 mb-4 text-gray-200" />
          ),
          li: ({ node, ...props }) => <li {...props} className="mb-2 text-gray-200" />,
          code: ({ node, inline, className, children, ...props }: CodeProps) => {
            return !inline ? (
              <pre className="bg-neutral-800 text-sm rounded-md p-4 overflow-x-auto mb-4 border border-zinc-700">
                <code className="text-gray-100" {...props}>{children}</code>
              </pre>
            ) : (
              <code className="bg-neutral-800 text-sm px-2 py-1 rounded text-gray-100 border border-zinc-700">
                {children}
              </code>
            );
          },
          blockquote: ({ node, ...props }) => (
            <blockquote
              {...props}
              className="border-l-4 border-zinc-600 pl-4 italic text-gray-300 bg-neutral-900/50 py-2 rounded-r-md mb-4"
            />
          ),
          strong: ({ node, ...props }) => (
            <strong {...props} className="font-semibold text-gray-100" />
          ),
          em: ({ node, ...props }) => (
            <em {...props} className="italic text-gray-200" />
          ),
          a: ({ node, ...props }) => (
            <a {...props} className="text-blue-400 hover:text-blue-300 underline transition-colors" />
          ),
        }}
      />
    </ScrollArea>
    </div>
  );
}
