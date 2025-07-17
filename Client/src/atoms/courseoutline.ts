import { atom } from "recoil";

// Interface for course outline
export interface Lesson {
  title: string;
}

export interface Module {
  title: string;
  lessons: Lesson[];
}

export interface typeCourseOutline {
  title: string;
  modules: Module[];
}



export const courseOutlineAtom = atom<typeCourseOutline | null>({
  key: "courseOutlineAtom",
  default: null,
  //effects_UNSTABLE: [persistAtom]
});




export const courseMetaAtom = atom({
  key: "courseMetaAtom",
  default: {
    topic: "",
    difficulty: "",
  },
});
