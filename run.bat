@echo off
echo Running FieldWire Label Printer: MacOS/Linux
echo will run both backend and frontend
echo. 

:: Check if the current directory is download_component_labels
for %%I in (.) do if /I "%%~nxI" neq "download_component_labels" (
    cd download_component_labels
)

:: Activate the virtual environment
call .\env\Scripts\activate

:: Start the Uvicorn server
start "Uvicorn Server" cmd /k "python -m uvicorn src.backend.app:app --reload"

:: Start the Node.js application
start "Node.js Application" cmd /k "npm start"

echo Both the Uvicorn server and Node.js application have been started.
