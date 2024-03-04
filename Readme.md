# Social Media Panel

This is a simple web application implemented using Django and React 


* Currently only the tasks concerning the project infrasructure infrastructe are done (except dockerizing).


## UI:
    - to run the ui on development mode, cd to ui and run `yarn start` 
    - The login page is implemented at path "auth/login/"
    - State management is implemented using Redux along with redux-thunk actions

## Project:
    - cd to ui and run `docker build . -t social_media_admin`
    - cd back to the root of the project and run `docker compose up -d`.
    - Then you can see the UI at localhost:3000
