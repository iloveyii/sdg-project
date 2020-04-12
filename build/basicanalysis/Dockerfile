FROM python:3-onbuild
ENV PYTHONUNBUFFERED 1
RUN apt update
# RUN apt install -y --no-install-recommends apt-utils
# RUN apt install swig -y
RUN apt install python3-pip -y
RUN pip3 install FlowCytometryTools
RUN pip3 install Flask==0.12
RUN pip3 install flask-restful==0.3.5
# RUN pip3 uninstall bottleneck -y
# RUN pip3 install bottleneck==1.2

# 1. Register and login on hub.docker.com
# 2. Create repository on hub.docker.com ie ml_cell
# 3. Create image: sudo docker image build -t ml_cell .
# 4. sudo docker login -u <username>
# 5. sudo docker tag ml_cell:latest alikth/ml_cell
# 6. sudo docker push alikth/ml_cell
# ssh to container: sudo docker exec -it docker-django_web_1 bash
# Clean space - delete all non running containers: docker system prune
