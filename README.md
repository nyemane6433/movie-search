# Movie Search

This movie search application allows you to search lightning fast through a wide variety of data types through the sample_mflix.movies dataset offered free to download on MongoDB Atlas.

## Prequisites
### Create Cluster 
- Create a MongoDB Atlas account at https://cloud.mongodb.com
- Create an Atlas Cluster
  - Select "Shared"
  - Cloud Provider: AWS
  - Region: us-east-1
  - Cluster Tier: M2
  - Cluster Name: search-demo
 
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
![load_data](https://github.com/user-attachments/assets/c8f5886d-78e9-4e26-a4b4-1a6c8e98ad88)


### Get Atlas Connection String
- Select "Connect"
- Select "Drivers"
- Select "Node.js" and Select Node.js driver version from drop down
- Copy the Connection String
This will be the MongoDB Atlas Connection String. Replace username / password with demo / demo.

## Search
### Search Index
- Navigate to Atlas Search and select "Create Search Index"
- Create Atlas Search index using json editor
- Database and Collection: sample_mflix.movies
- Index Name: default
- Index definition, refer to ```index.json```
```
{
  "mappings": {
    "dynamic": true
  }

}
```

### Search Aggregation Query
The file ```search-aggregation.js``` includes a search aggregation pipeline that uses the search index to query the fullplot, compare partial matching, and highlight the query string. 
```
[
    {
        '$search': {
            'index': 'default', 
            'text': {
                'query': 'werevolves and vampires', 
                'path': 'fullplot',
                'fuzzy': {
                    'maxEdits': 2
                }
            }, 
            'highlight': {
                'path': 'fullplot'
            }
        }
    }, {
        '$project': {
            '_id': 0, 
            'title': 1, 
            'year': 1, 
            'fullplot': 1, 
            'score': {
                '$meta': 'searchScore'
            }, 
            'highlight': {
                '$meta': 'searchHighlights'
            }
        }
    }, {
        '$limit': 10
    }
]
```

## App Services
Create an app services application to use Atlas functions and http endpoints to execute search aggregation query. 
- Navigate to "App Services"
- Create a New App
- Name: movieSearch
- Link your database
  - Use an existing MongoDB Atlas Data Source: search-demo
<img width="978" alt="app_services" src="https://github.com/user-attachments/assets/84232c21-2c79-4af3-a349-d22d4886a38e">

### Configure App Services Function
In Atlas App Services, Navigate to ```Functions``` and select ```Create a Function```

```Function Settings``` \
<img width="1480" alt="app_services2" src="https://github.com/user-attachments/assets/5aaa21c0-b76c-4405-be30-55d05ab94a31">
<img width="1438" alt="app_services3" src="https://github.com/user-attachments/assets/db28a438-2b24-4335-978c-f3e616183805">

```Function Editor``` \
Copy and past the code in ```movie-search-function.js``` into the function editor. 
```
exports = function(payload) {
    const collection = context.services.get("mongodb-atlas").db("sample_mflix").collection("movies");
    let arg = payload.query.arg;
    return collection.aggregate([
        { $search: {
                       text: {
                          query: arg,
                          path:'fullplot',
                          fuzzy: {
                            maxEdits: 2
                          }
                        },
                        highlight: { path: 'fullplot' }
                }},
                { $project: {
                       title: 1,
                       _id:0,
                       year:1,
                       fullplot:1,
                       score: { $meta: 'searchScore'},
                       highlight: {$meta: 'searchHighlights'}
                }},
                { $limit: 10}
        ]).toArray();
  };
```

### Configure App Services HTTPS Endpoint
Navigate to HTTPS End point and select ```Add an Endpoint``` 

![http_endpoint1](https://github.com/user-attachments/assets/34ef0d41-cb39-4cb9-91fd-5d5219466f3a)
![http_endpoint2](https://github.com/user-attachments/assets/1a09fff4-0516-4d16-a363-25bf5ea60b13)
![http_endpoint3](https://github.com/user-attachments/assets/28d85211-999d-4a5e-bce1-7245c7c6da38)

Copy the HTTP Endpoint URL. Use this endpoint in the index.html file.

```index.html```
Replace the HTTPs endpoint in line 54 in ```index.html``` with the HTTPs endpoint created and save the file. 
