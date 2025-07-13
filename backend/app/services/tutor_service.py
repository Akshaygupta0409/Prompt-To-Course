from operator import ge
import os
from typing import Dict, Any, List
from dotenv import load_dotenv
from google.protobuf import json_format
from langchain_core.language_models import llms
from langchain_core.outputs import Generation
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate

import json
from .course_outline_promt import course_outline_prompt
from .content_prompt import lesson_content_prompt


# Load environment variables
load_dotenv()

# Initialize LLM
def initialize_llm(temperature: float=0.1):
    return ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        temperature=temperature,
        google_api_key=os.getenv("GEMINI_KEY")
    )


# ---------------- Prompt Template ---------------- #

course_outline_template = course_outline_prompt()

# Generate Learning Module----------- ---------------
def generate_learning_module(topic: str, difficulty: str):
    GeminiLLM = initialize_llm()
    InputTemplate = course_outline_template.invoke({
        "topic": topic,
        "difficulty": difficulty
       })
    Result = GeminiLLM.invoke(InputTemplate)
    return Result.content

# generating lesson for the content selected by the user
def generate_lesson_content(lesson_title: str):
    GeminiLLM = initialize_llm()
    prompt_template = lesson_content_prompt()
    content_input = prompt_template.invoke({
    "lesson_title": lesson_title
     })
    Result = GeminiLLM.invoke(content_input)
    return Result.content
print(generate_lesson_content("Introduction to Programming"))
