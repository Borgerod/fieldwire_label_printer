:: ON WINDOWS 

@ECHO OFF

:: Check if the current directory is download_component_labels
cd download_component_labels

:: Activate the virtual environment
call .\env\Scripts\activate

:: Start the Uvicorn server
START python -m uvicorn src.backend.app:app --reload

:: Start the Node.js application
START npm start

EXIT