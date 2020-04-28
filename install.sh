#!/bin/bash

# Script to be executed just once, when the system is installed
# Commands are only run once even if the script is called multiple times.

if [ ! -f .installed ]; then 
    npm install 
    touch .installed

fi 

npm start