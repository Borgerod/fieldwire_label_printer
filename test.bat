:: ON WINDOWS 

@ECHO OFF
cd download_component_labels
call .\env\Scripts\activate
START python -m uvicorn src.backend.app:app --reload
START npm start
EXIT