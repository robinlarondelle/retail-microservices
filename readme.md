# Stepts taken to create the docker container:

1) create the docker file with a base image
2) build the docker file using `docker build [-t <name>] .`
   
   The '.' specifies the folder from which to build the container. The -t file following a string marks the name of the image

   **Building the container is important when you've made changes to the dockerfile!**

3) Run the command `docker run [--name <test>] <image-name|image-id>` to run the previously build container


## Commands
* `docker ps [-a]` - check all the running containers (-a: including those running in the background)
* `docker stop <name>` - stop the docker container with the specified name
* `docker rm <name>` - deletes a image with the specified name
* `docker build [-t <name>] <directory>` - build a new image from a Dockerfile with a optional name 
* `docker run [--name <name>] <image-name>` - run a Docker Image with a optional name (--name)

### docker Run flags
* `-it` - Interactive terminal: makes you able to interact with the terminal (^C to quit the container)
* `-p` - Port: map the open port from the container to a free port on the machine
* `-d` - detached mode: don't display the terminal of the container (opposite of -it)
