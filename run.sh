#!/bin/bash
docker_image_name="tfg_backend"
container_name="tfg_backend_container"

if [ $# -eq 0 ]
    then
        echo "No arguments supplied."
# launch containers, install everything, and starts the system
elif [ $1 == "launch_containers_install_and_start_system" ]
    then
        docker build . -t $docker_image_name && 
        docker-compose up

# starts the system that has been previously stopped
elif [ $1 == "start_system" ]
    then
        docker-compose up      

elif [[ $(docker ps -aqf "name=$container_name") ]]
    then
        # stop the system without deleting anything
        if [ $1 == "stop_system" ]
            then
                docker-compose stop
        # removes all the containers and deletes all the installation files
        elif [ $1 == "remove_containers_and_clean_installation" ]
            then
                docker-compose rm &&
                docker rmi $docker_image_name 
                rm .loadedTestingUsers
        fi
else
    echo "The system doesn't seem to be running."
fi
