#!/bin/bash


# test-status: NOT TESTED 


echo "Installing FieldWire Label Printer: MacOS/Linux"
echo

# Change directory to download_component_labels
if [ ! -d "download_component_labels" ]; then
    echo "Directory download_component_labels does not exist."
    exit 1
fi
cd download_component_labels

# Create a Python virtual environment if it doesn't exist
if [ ! -d "env" ]; then
    python3 -m venv env
fi

# Activate the virtual environment
source env/bin/activate

# Check if FIELDWIRE_API_KEY environment variable is set
if [ -z "$FIELDWIRE_API_KEY" ]; then
    echo
    echo "API key needed to install and run this app."
    echo "If you do not have one, contact your supervisor or IT department who will provide you with a key."
    echo
    read -p "Please enter your API key: " FIELDWIRE_API_KEY
    echo "Setting FIELDWIRE_API_KEY in virtual environment..."

    # Set the environment variable in the virtual environment's activation script
    echo "export FIELDWIRE_API_KEY=$FIELDWIRE_API_KEY" >> env/bin/activate
else
    echo "FIELDWIRE_API_KEY is already set in the environment."
fi

# Install Python packages from requirements.txt
pip install -r requirements.txt

# Install Node.js packages
npm install

echo "Environment setup is complete!"
echo "Run the app using the appropriate command for your system."
