#!/bin/bash

# Exit on error
set -e

echo "--- Setting up Smart Crop Environment ---"

# Activate virtual environment if it exists, otherwise create it
if [ -d "venv" ]; then
    echo "Activating existing venv..."
    source venv/bin/activate
else
    echo "Creating new venv..."
    python3 -m venv venv
    source venv/bin/activate
fi

echo "Installing requirements..."
pip install -r requirements.txt

echo "--- Generating Dataset ---"
python3 backend/generate_dataset.py

echo "--- Training Model ---"
python3 backend/train_model.py

echo "--- Setup Complete ---"
