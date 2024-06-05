@REM @echo off

@REM echo Installing Fieldwire Label Printer
@REM echo.

@REM REM Change directory to download_component_labels
@REM cd download_component_labels

@REM REM Create a Python virtual environment
@REM python -m venv env

@REM REM Activate the virtual environment
@REM call .\env\Scripts\activate

@REM REM Check if FIELDWIRE_API_KEY environment variable is set
@REM set FIELDWIRE_API_KEY_VALUE=%FIELDWIRE_API_KEY%
@REM if "%FIELDWIRE_API_KEY_VALUE%"=="" (
@REM     echo.
@REM     echo API_key needed to install and run this app.
@REM     echo If you do not have one, contact your supervisor or IT department who will provide you with a key.
@REM     echo.
@REM     set /p FIELDWIRE_API_KEY=Please enter your API_key: 
@REM     echo Setting FIELDWIRE_API_KEY in virtual environment...
@REM     setx FIELDWIRE_API_KEY "%FIELDWIRE_API_KEY%" /M
@REM ) else (
@REM     echo FIELDWIRE_API_KEY is already set in the environment.
@REM )

@REM REM Install Python packages from requirements.txt
@REM pip install -r requirements.txt

@REM REM Deactivate the virtual environment
@REM deactivate

@REM REM Install Node.js packages
@REM npm install

@REM echo Environment setup is complete!
@REM echo Click on run.bat to run the app.
@REM pause

@echo off

:: Check for administrative privileges
openfiles >nul 2>&1
if %errorlevel% neq 0 (
    echo Requesting administrative privileges...
    powershell start-process -verb runas -filepath "%~f0"
    exit /b
)

echo %cd%
pushd %~dp0
echo %cd%

echo Installing Fieldwire Label Printer
echo.

REM Change directory to download_component_labels
cd download_component_labels

REM Create a Python virtual environment
python -m venv env

REM Activate the virtual environment
call .\env\Scripts\activate

REM Check if FIELDWIRE_API_KEY environment variable is set
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

REM Install Python packages from requirements.txt
pip install -r requirements.txt

REM Deactivate the virtual environment
deactivate

REM Install Node.js packages
npm install

echo Environment setup is complete!
echo Click on run.bat to run the app.
pause
