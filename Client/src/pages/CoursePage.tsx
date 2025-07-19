"use client"

import AppSidebar from "../components/appsidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import LessonViewer from "../components/RenderContent";
import { Button } from "@/components/ui/button";
const CoursePage: React.FC = () => {
  
  return (
   <div className="flex bg-neutral-900">
    {/* sidebar */}
    <div>
      <SidebarProvider>
      <AppSidebar/>
      </SidebarProvider>
    </div>
    {/* main content */}
    <div className="w-full grid grid-cols-16 text-white">
    
     <div className="col-span-12 bg-neutral-900"> 
     
      <LessonViewer /> 
      
     
      </div>
     <div className="col-span-4 p-4 text-stone-50 bg-neutral-900 border border-zinc-700 rounded-lg mt-1 ml-1 mb-1 mr-1"> 
       <div className="flex justify-center items-center">
         <Button className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold ">
          Want help ?
      </Button>
       </div>
     
      </div>
    </div>
    {/* sidebar */}
    </div>
  );
};

export default CoursePage;