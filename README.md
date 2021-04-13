# COVID-VACCINE-SPOTTER-NOTIFICATIONS

COVID-VACCINE-SPOTTER-NOTIFICATIONS is a quick project that you can run locally to get email notifications whenever covid vaccine appointments are available in your area.

## Installation

Use npm to install

```bash
npm install
```

## Before Running
Before running the application you must set up a google maps API KEY. To do so [follow these instructions](https://developers.google.com/maps/gmp-get-started#create-project)

## Configure
Create a .env file and add the following variables with your custom values and criteria 
```node
GOOGLE_GEOCODE_API_KEY=123
NOTIFICATION_SENDER_EMAIL=test@gmail.com
NOTIFICATION_SENDER_EMAIL_PASSWORD=123
DESTINATION_EMAIL=test@mail.dcu.ie
STATE=CA
ZIPCODE=94115
RADIUS=25
```

## Run the project
```bash
npm run start
```

## Contributing
This is just a quick project to get this running locally. If looking to contribute please consider integrating this with the awesome open source project [VaccineSpotter](https://github.com/GUI/covid-vaccine-spotter). 
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)