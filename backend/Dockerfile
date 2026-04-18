# Use an official Python runtime as a parent image
FROM python:3.9-slim-buster

# Set the working directory in the container
WORKDIR /app

# Install any needed packages specified in requirements.txt
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . .

# Run the uvicorn server on port 7860, which is standard for Hugging Face Spaces
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "7860"]