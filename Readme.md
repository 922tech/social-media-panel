# Social Media Panel

This is a simple web application implemented using Django and React 


* Currently only the tasks concerning the project infrasructure infrastructe are done (except dockerizing).

## Project:
    - to run the project you can run `docker compose up -d`.

## UI:
    - to run the ui , cd to ui and run `yarn start` 
    - to run the ui with docker, `sh ./ui/init-ui.sh`. then you will have a docker image that can be run with command
      `docker run -p 3000:80 social_media_panel`.

    - The login page is implemented at path "auth/login/"
    - State management is implemented using Redux along with redux-thunk actions
