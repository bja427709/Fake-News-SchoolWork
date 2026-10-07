@echo off
title Example Tantalon News
cd /d "%~dp0"
python launch.py
if errorlevel 1 pause
