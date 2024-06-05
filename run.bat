@echo off

REM Check if the current directory is download_component_labels
for %%I in (.) do if /I "%%~nxI" neq "download_component_labels" (
    cd download_component_labels
)

REM Activate the virtual environment
call .\env\Scripts\activate

REM Start the Uvicorn server
start "Uvicorn Server" cmd /k "python -m uvicorn src.backend.app:app --reload"

REM Start the Node.js application
start "Node.js Application" cmd /k "npm start"

echo Both the Uvicorn server and Node.js application have been started.
