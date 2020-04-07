FROM python:3-onbuild
ENV PYTHONUNBUFFERED 1
RUN apt update
RUN apt install -y --no-install-recommends apt-utils
RUN apt install swig -y
RUN apt install python3-pip -y
RUN pip3 install cytoflow
RUN pip3 install Flask==0.12
RUN pip3 install flask-restful==0.3.5

# 1. Register and login on hub.docker.com
# 2. Create repository on hub.docker.com ie ml_cell
# 3. Create image: sudo docker image build -t ml_cell .
# 4. sudo docker login -u <username>
# 5. sudo docker tag ml_cell:latest alikth/ml_cell
# 6. sudo docker push alikth/ml_cell