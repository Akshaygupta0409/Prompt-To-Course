import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import json


from services.tutor_service import generate_learning_module, generate_lesson_content

app = FastAPI(title="AI Tutor API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

## endpoint for learning module generation
@app.post("/api/v1/course-outline")
def learn_topic(request: dict):
    """
    Generate a learning module for the given topic
    """
    try:
        module = generate_learning_module(request["topic"], request["difficulty"])

        # If module is a JSON string, convert to dict
        if isinstance(module, str):
            # Optional: strip code block markers like ```json
            cleaned = module.strip().strip("```json").strip("```").strip()
            module = json.loads(cleaned)

        return JSONResponse(content=module)
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid JSON format returned by model")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

## LESSON CONTENT ENDPOINT
@app.post("/api/v1/lesson")
def lesson_content(request: dict):
    """
    Generate a lesson for the given topic
    """
    try:
        lesson = generate_lesson_content(request["lesson_title"])
        # Return raw markdown content
        if isinstance(lesson, str):
            # Clean up any potential markdown code block markers
            cleaned = lesson.strip().strip("```markdown").strip("```").strip()
            return JSONResponse(content={"content": cleaned})
        return JSONResponse(content={"content": lesson})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    
@app.get("/api/v1/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

if __name__ == "__main__":
   
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
