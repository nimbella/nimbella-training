## Building a virtualenv with PIL
cd py/resize
ls
# entering in the image and creating the virtualenv
docker run -ti -v $PWD:/mnt --entrypoint=/bin/bash openwhisk/actionloop-python-v3.7
cd /mnt
ls
virtualenv virtualenv
source virtualenv/bin/activate
pip3 install Pillow
exit
# zipping and deploying
zip -r ../packages/default/resize.python-3.zip *
cd ../..
nim project deploy py
nim action get resize --url
