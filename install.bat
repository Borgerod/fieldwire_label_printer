@echo off
echo Installing FieldWire Label Printer: Windows
echo.

:: Check for administrative privileges
openfiles >nul 2>&1
if %errorlevel% neq 0 (
    echo Requesting administrative privileges...
    powershell start-process -verb runas -filepath "%~f0"
    exit /b
)

:: Return to ./fieldwire_component_labe.s  
echo %cd%
pushd %~dp0
echo %cd%

:: Change directory to download_component_labels
cd download_component_labels

:: Create a Python virtual environment
python -m venv env

:: Activate the virtual environment
call .\env\Scripts\activate

:: Check if FIELDWIRE_API_KEY environment variable is set
set FIELDWIRE_API_KEY_VALUE=%FIELDWIRE_API_KEY%
if "%FIELDWIRE_API_KEY_VALUE%"=="" (
    echo.
    echo API_key needed to install and run this app.
    echo If you do not have one, contact your supervisor or IT department who will provide you with a key.
    echo.
    set /p FIELDWIRE_API_KEY=Please enter your API_key: 
    echo Setting FIELDWIRE_API_KEY in virtual environment...
    setx FIELDWIRE_API_KEY "%FIELDWIRE_API_KEY%" /M
) else (
    echo FIELDWIRE_API_KEY is already set in the environment.
)

:: Install Python packages from requi::ents.txt
pip install -r requi::ents.txt

:: Install Node.js packages
npm install

echo Environment setup is complete!
echo Click on run.bat to run the app.
pause
