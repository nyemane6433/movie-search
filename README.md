# Movie Search

This movie search application allows you to search lightning fast through a wide variety of data types through the sample_mflix.movies dataset offered free to download on MongoDB Atlas.

## Prequisites
### Create Cluster 
- Create a MongoDB Atlas account at https://cloud.mongodb.com
- Create an Atlas Cluster
  - Cloud Provider: AWS
  - Region: us-east-1
  - Cluster Tier: M10
  - Storage: 40 GB
  - Cluster Name: demo
 
### Create Database User
- Navigate to Database Access
- Create a database user
  - username: demo
  - password: demo
    
### Configure Network Access
- Navigate to Network Access
- Select Add IP Address
- Select "Allow Access from Anywhere"

### Load Sample Data
Select ... and "Load Sample Dataset
![image2](https://github.com/user-attachments/assets/a2cca498-30bd-4f81-82a3-0e9bbd6f0e9c)


### Get Atlas Connection String
<img width="845" alt="image3" src="https://github.com/user-attachments/assets/b7aa41ad-1582-45bd-a66e-a9694f195a4e">
![image4](https://github.com/user-attachments/assets/9a0b0c0a-0ca6-4c2c-9632-4864c735597b)

This will be the MongoDB Atlas Connection String. Replace username / password with demo / demo.
