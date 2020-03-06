     1. Install Django

pip3 install django

![](https://github.com/iloveyii/sdg-project/blob/master/backend/project1/image/1.png?raw=true)

2. Install mongodb module for django(witch is 
"djongo")

pip3 install djongo 

3. creat django project

django-admin startproject mongo_project

4. creart app

python manage.py startapp sdg

5. add created app to installed app list

python manage.py migrate

6. Set MongoDB

7. Create Database Migrations

python manage.py migrate

8. Creat Super User 
python manage.py creates uperuser
in models.py we defind the database fileds
9. Create Models
![](https://github.com/iloveyii/sdg-project/blob/master/backend/project1/image/3.png?raw=true)
12. Verify storing of data using shell
    - Install mangoDB with link 

        [Chlick this Link](https://www.mongodb.com/download-center/community)
    - excuse mongod.exe
      C:\mongodb\bin\mongod --dbpath c:\data\db
      
      ![](https://github.com/iloveyii/sdg-project/blob/master/backend/project1/image/09e394b244693ddf0be29f97383fe4b.png?raw=true)

    - start mangoDB  
      net stop MongoDB 