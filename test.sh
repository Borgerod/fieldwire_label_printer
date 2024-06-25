#!/bin/bash

# test-status: NOT TESTED 

echo "Running FieldWire Label Printer: MacOS/Linux"
echo "will run both backend and frontend"
echo

# ensures that the script exits immediately if the mkdir command fails to execute.
set -e 

# the run command
cd download_component_labels
source env/bin/activate; 
python -m uvicorn src.backend.app:app --reload & npm start;