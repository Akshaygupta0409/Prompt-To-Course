
import { recoilPersist } from "recoil-persist";
import { topicAtom } from "./topic";
import { difficultyAtom } from "./difficyult";
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

const { persistAtom } = recoilPersist();

export const courseOutlineAtom = atom<typeCourseOutline | null>({
  key: `${topicAtom} + ${difficultyAtom}`,
  default: null,
  effects_UNSTABLE: [persistAtom]
});


import { atom } from "recoil";

export const courseMetaAtom = atom({
  key: "courseMetaAtom",
  default: {
    topic: "",
    difficulty: "",
  },
});
