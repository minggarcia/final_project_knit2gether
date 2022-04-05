## knit2gether - a social media platform for knitting enthusiasts 
A web app for uploading pictures of knits where you can add a title, description, the needle size and also the yarn name of the project you want to share with the community. Users can interact with each other using the love letter (aka comment) section within the post that was uploaded. 

## technologies
- Next.js
- emotion/css
- Javascript / Typescript
- PostgreSQL
- ley
- dotenv-safe
- bcrypt
- Cloudinary
- Figma (https://www.figma.com/file/HuH2aQVZGTcuQv8CGW0Yon/FinalProject?node-id=0%3A1)
- draw sql



## set up
Clone the repo from GitHub and then install the dependencies:

`git clone https://github.com/minggarcia/final_project_knit2gether
cd final_project_knit2gether
yarn`

Setup a database with postgres on your computer:

`psql <login>
CREATE DATABASE <database name>;
CREATE USER <username> WITH ENCRYPTED PASSWORD '<pw>';
GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;`

Create a .env file with the userinfo for the database and create .env.example as a template file for userinfo

Use migrations:

`yarn migrate up`

To delete data from database run:

 `yarn migrate down`
 
 To run the development server:
  `yarn dev`
  
  Open http://localhost:3000 with your browser to see the result.
  
  ## deployment
  To deploy this project, create a Heroku Account and follow the instructions
  
  ## database schema 
  <img width="785" alt="image" src="https://user-images.githubusercontent.com/94932856/161445254-3132c4b2-081c-4d73-91f7-cb795c22b4c2.png">
  
  ## preview
  ![Screenshot 2022-04-03 at 21 45 49](https://user-images.githubusercontent.com/94932856/161445469-433f4688-b34c-44d0-9f01-7a48ce6d92c4.png)
![Screenshot 2022-04-03 at 21 46 59](https://user-images.githubusercontent.com/94932856/161445473-7494ae9c-cdea-4ebc-8a1b-86198208fcc5.png)


