#!/bin/bash


# test-status: NOT TESTED 


echo "Running FieldWire Label Printer: MacOS/Linux"
echo "will run both backend and frontend"
echo 

# Function to change directory to download_component_labels if not already there
change_directory() {
  if [ "${PWD##*/}" != "download_component_labels" ]; then
    if [ -d "download_component_labels" ]; then
      cd download_component_labels || { echo "Failed to change directory to download_component_labels."; exit 1; }
    else
      echo "Directory download_component_labels does not exist."
      exit 1
    fi
  fi
}

# Function to check and activate the virtual environment
activate_virtualenv() {
  if [ -d "env" ]; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
      # macOS
      source env/bin/activate
    else
      # Linux
      source env/bin/activate
    fi
  else
    echo "Virtual environment 'env' does not exist. Please run the install script first."
    exit 1
  fi
}

# Function to start the Uvicorn server and Node.js application
start_services() {
  if command -v osascript &> /dev/null; then
    # macOS
    osascript -e 'tell application "Terminal" to do script "cd \"$(pwd)\"; source env/bin/activate; python -m uvicorn src.backend.app:app --reload"'
    osascript -e 'tell application "Terminal" to do script "cd \"$(pwd)\"; npm start"'
  elif command -v gnome-terminal &> /dev/null; then
    # Linux with GNOME Terminal
    gnome-terminal -- bash -c "cd \"$(pwd)\"; source env/bin/activate; python -m uvicorn src.backend.app:app --reload; exec bash" &
    gnome-terminal -- bash -c "cd \"$(pwd)\"; npm start; exec bash" &
  else
    echo "Neither osascript (macOS) nor gnome-terminal (Linux) is available."
    exit 1
  fi
}

# Change directory to download_component_labels if not already there
change_directory

# Activate the virtual environment
activate_virtualenv

# Start the services
start_services

echo "Both the Uvicorn server and Node.js application have been started."
