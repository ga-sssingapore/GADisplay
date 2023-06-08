# GADisplay

Full stack app to schedule, record and display class timings.

App was developed with the intent to display class timings on a Samsung Tablet A (800px by 1112px when positioned vertically) and to provide an administrative interface for laptops/computers.
This administrative interface would provide the means for users/staff to schedule classes, ad-hoc events and to track which classes were coming up in the week.

# Technologies used

## Javascript

This app was built with Javascript, utilizing the React.js framework for front-end and Express.js framework for back-end.

## Front-end

### <a href="https://react.dev" target="_blank" >React.js</a>

This app was built with the React.js, with several grand components acting as pages, linked via React Router v6.11. For each page, specialized components were built to display information as required or enable functionality as desired.

### CSS & <a href="https://getbootstrap.com/" target="_blank" >Bootstrap</a>

CSS was used heavily to finely control design and positioning of elements. Bootstrap was used to provide responsive breakpoints for element sizing, which was crucial considering the app had to be usable on both PC and tablet devices.

## Back-end

### Python

### Flask

### SQLAlchemy

### Marshmallow

### Waitress

## Database

### PostgreSQL

# General Approach

The design of our app was largely controlled by the prototype handed over to us by a design team and as such, we endeavoured to stick as close to the design as we could. Early in development, we prioritized setting up each of the app’s pages as per design and worked on styling the pages, since the app’s design was the first resource made available to us.

<br/>

## Front-end

<br/>

## Back-end

### Models

### Routes & Blueprints

### Authentication

## Challenges

1. To authenticate users, we relied on users obtaining an access token after they log in in order to query data from protected endpoints to display information in the app. To make the access token persist even after the user refreshed the page, we stored the access token in local storage and retrieved it each time the app loaded, setting the access token into a state. However, this led to problems where on refresh, the app was loading and attempting to fetch data from our database despite the fact that the access token had yet to be set into its state, leading to unauthorized queries throwing errors in the front-end when the app first loads.
2. Development of components from scratch. With time constraints in mind, our aim was to faithfully bring to life the app envisioned by the designers, encompassing both its visual appeal and functionality. However, due to the nature of how certain components were initially designed in Figma, we encountered difficulties in directly leveraging the CSS generated within the Figma environment.
3. For submission of receipts, dealing with data transfer of images was unfamiliar to the team and required us to greatly enhance our knowledge on encoding schemes, BSON type and the transfer methods available to MongoDB. The images were eventually sent directly to MongoDB as binData.
4. While react-webcam and react-qr-scanner were relatively straightforward to implement, the documentation for react-qr-scanner was very limited, resulting in the team being unable to customize it to meet the intended design.

## Solutions and/or mitigation attempts

1. To resolve the app attempting to fetch data before the access token was made available to components, we had to strictly control when each function was being called when the app loaded. This was done by adding useEffects with access token’s state as dependency on pages where the access token was required and by having these functions conditionally run when access token was available, this prevented appearance of the “false unauthorized errors”.
2. Due to how the components were designed in Figma, we had to meticulously style and harmonize these components, a laborious process that demanded significant investment of time and effort.
3. In the interest of time, the team chose not to invest further time to display these images in a folder on a local machine (for further verification) or implement a feature that allows users to select a receipt from a folder in their local machine
4. In our attempts to style the webcam and qr scanner, we experimented using commands/properties from other similar react webcam/qr scanner libraries in hopes that the libraries we used would have similar implementations. However, this was to no avail and the stylings were left as is to focus our efforts on other important features of the app.

# Dependencies

On top of React.js and Python, this app is dependent on the following packages.

## Front-end

- React Router DOM v6.11 <br/>`npm i react-router-dom`
- JSON Web Token decode <br/>`npm i jwt-decode`

## Back-end

- Flask <br/>`npm i react-router-dom`

# User Stories

This app was created in recognition of the growing demand for public workspaces by remote workers, self-employed individuals and students. This app aims to connect this population to cafes and businesses which are willing and capable of hosting these people, allowing them to utilize their venues as workspaces in exchange for their patronage.

## Features

# Wireframes and Designs

## Initial Desgin provided by Design team

### Main pages

![Home Page](front-end/public/markdownAssets/homePage/homePage.png)![Explore Page](front-end/public/markdownAssets/explorePage/explorePage.png)

![Saved Cafes Page](front-end/public/markdownAssets/savedPage/SavedPage.png)![Profile Page](front-end/public/markdownAssets/profilePage/profilePage.png)

### Scan/Redeem page

![Scan/Redeem Page](front-end/public/markdownAssets/scanPage/scanPrompt.png)![Scan Page](front-end/public/markdownAssets/scanPage/scanningAndCollecting.png)![Collection Guide](front-end/public/markdownAssets/scanPage/collectionGuide.png)

### Referral page

![Referral Page](front-end/public/markdownAssets/homePage/referralPage.png)![Share drawer](front-end/public/markdownAssets/homePage/shareDrawer.png)![Invite drawer](front-end/public/markdownAssets/homePage/inviteDrawer.png)

### About page

![About Page](front-end/public/markdownAssets/explorePage/aboutPage.png)![Menu](front-end/public/markdownAssets/explorePage/menuTab.png)![Reviews](front-end/public/markdownAssets/explorePage/reviewsTab.png)

## Routes Web

![Route Web](front-end/public/markdownAssets/wireframe.png)
