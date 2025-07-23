"use client";

import AppSidebar from "../components/appsidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import LessonViewer from "@/components/RenderContent";
import VideosRender from "@/components/videos";

const CoursePage: React.FC = () => {
  return (
    <div className="flex bg-neutral-900">
      {/* sidebar */}
      <div>
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
      </div>
      {/* main content */}
      <div className="w-full grid grid-cols-16 text-white">
        <div className="col-span-12 
        bg-neutral-900 ">
          <LessonViewer />
        </div>
        <div className="col-span-4 
        bg-neutral-900 
        border border-neutral-800 rounded-lg
        fixed right-0 
        h-full 
        min-w-1/5
       mt-2
       mb-4
       mr-2
        p-2">
          <div className="text-center  text-lg font-semibold p-2">Related Videos</div>
          <VideosRender />
        </div>
      </div>
      {/* sidebar End*/}
    </div>
  );
};

export default CoursePage;
