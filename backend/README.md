# Backend

This is the backend of the Strong Start Application.

## Setup

Start Express Server:

```shell
nodemon index.js
```

Seed Database:

```shell
npx prisma db seed
```

Start Prisma Server:

```shell
npx prisma studio
```

### Google Maps API

- [Text Search API](https://developers.google.com/maps/documentation/places/web-service/text-Search) used for validating addresses
- [Longitude/ Latitude Calculations](https://gis.stackexchange.com/questions/2951/algorithm-for-offsetting-latitude-longitude-by-some-amount-of-meters#:~:text=//Position%2C%20decimal%20degrees,51%2C00089832%0A%20lonO%20%3D%200%2C001427437)

### Import Ordering

- Prisma
- Express
- routes
- errors
- utils
- seed
