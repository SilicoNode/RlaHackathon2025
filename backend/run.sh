#!/bin/bash
echo "Starting Plant Health Prediction Backend..."
uvicorn app:app --reload

