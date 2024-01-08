# How to Use Pemilu Backend with Postman

## How to Use Authorization

1. Open Postman.
2. Click on the 'Authorization' tab.
3. Choose 'Bearer Token' on the left.
4. Insert the Token on the right.

## A. User

1. Register User

- **URL:** http://localhost:5000/api/v1/user/register
- **Method:** POST
- **JSON Body Example:**

  ```json
  {
    "fullName": "Renatta Deborah",
    "address": "New York",
    "gender": "Female",
    "username": "myren",
    "password": "1234",
    "role": "ghost" (Note: there are three options admin, editor and ghost)
  }

## 2. Login

- **URL:** http://localhost:5000/api/v1/user/login
- **Method:** POST
- **JSON Body Example:**

```json
{
    "username": "myren",
    "password": "1234"
}
```
Note: you will received token which is used to authorization

## B. Article

1. Getting All Articles (No Authorization)

- **URL:** http://localhost:5000/api/v1/articles
- **Method:** GET

2. Getting a Specific Article (No Authorization)

- **URL:** http://localhost:5000/api/v1/article/{article-id}
- **Method:** GET

3. Create an Article (Authorization Required)

- **URL:** http://localhost:5000/api/v1/article/create
- **Method:** POST
- **Form-data Body Example:**
 ```
    title = Menghijaukan Bumi
    author = Renatta
    description = Kampanye guna untuk menghijaukan bumi
    date = 2023-02-26
    picture = renren.png
```
4. Update an Article (Authorization Required)

- **URL:** http://localhost:5000/api/v1/article/{article-id}
- **Method:** PATCH
- **Form-data Body Example:**
```
    title = Menghijaukan Bumi
    author = Renatta
    description = Kampanye guna untuk menghijaukan bumi
    picture = renren.png
    date = 2023-02-26
```
5. Delete an Article (Authorization Required)

- **URL:** http://localhost:5000/api/v1/article/{blog-id}
- **Method:** DELETE

# C. Voter

1. Getting All Votes (Authorization Required)

- **URL:** http://localhost:5000/api/v1/vote
- **Method:** GET

2. Voting (Authorization Required)

- **URL:** http://localhost:5000/api/v1/vote
- **Method:** POST
- **JSON Body Example:**

```json
{
    "no": 2
}
```
# D. Paslon

1. Getting All Paslons (No Authorization)

- **URL:** http://localhost:5000/api/v1/paslons
- **Method:** GET

2. Getting a Specific Paslon (No Authorization)

- **URL:** http://localhost:5000/api/v1/paslon/{paslon-id}
- **Method:** GET

3. Create a Paslon (Authorization Required)

- **URL:** http://localhost:5000/api/v1/paslon/add
- **Method:** POST
- **Form-data Body Example:**
```
   name = Gigi Hadid
   no = 2
   visionAndMission = Memajukan UMKM
   picture = gigi.png
```
4. Update a Paslon (Authorization Required)

- **URL:** http://localhost:5000/api/v1/paslon/{paslon-id}
- **Method:** PATCH
- **Form-data Body Example:**
```
    name = update Gigi Hadid
    no = update 2
    visionAndMission = update Memajukan UMKM
    picture = update gigi.png
```
5. Delete a Paslon (Authorization Required)

- **URL:** http://localhost:5000/api/v1/paslon/{paslon-id}
- **Method:** DELETE

# E. Partai

1. Getting All Partais (No Authorization)

- **URL:** http://localhost:5000/api/v1/partais
- **Method:** GET

2. Getting a Specific Partai (No Authorization)

- **URL:** http://localhost:5000/api/v1/partai/{partai-id}
- **Method:** GET

3. Create a Partai (Authorization Required)

- **URL:** http://localhost:5000/api/v1/partai/add
- **Method:** POST
- **Form-data Body Example:**
```
    name = Partai Green Flag
    chairman = Zayn
    visionAndMission = Membuat jalan tol 
    address = New York
    picture = zayn.jpg
    paslon : 2 (paslonId)
```
4. Update a Partai (Authorization Required)

- **URL:** http://localhost:5000/api/v1/partai/{paslon-id}
- **Method:** PATCH
- **Form-data Body Example:**
```
     name = Update Partai Green Flag
     chairman = Update Zayn
     visionAndMission = Update Membuat jalan tol
     address = Update New York
     picture = zayn.jpg
     paslon = 2 (paslonId)
```
5. Delete a Partai (Authorization Required)

- **URL:** http://localhost:5000/api/v1/partai/{paslon-id}
- **Method:** DELETE

