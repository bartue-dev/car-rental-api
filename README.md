<!-- PROJECT LOGO -->

<a id="readme-top"></a>
<br />

<div align="center">
  <h2 align="center">Car_rental_api</h2>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="https://github.com/bartue-dev/blog_api/blob/main/api-documentation.md">API Documentation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

car_rental_api is a personal project. It has admin side where admin can add car(vehicle) with image, update car(vehicle), delete car(vehicle). <br />
User side where user can browse available cars(vehicles). Book a car(vehicle). Add testimonials about the service of the company.

Key features:

-   Register - client side register an account.
-   Log-in - client side log-in the registered account. Then the api return an accesstoken as json response and refresh token save in cookies and database.

Others:

-   Authentication - Uses a **jsonwebtoken**(jwt) for authentication/authorization.
-   Validation - Uses a express-validator to return a validation errors if client input a invalid api request
-   Error response - Created a custom error that handles the error response to every api request
-   Prisma error response - Uses the prisma error handling. Handles errors of queries.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

<!-- BADGES -->

-   [![Express.js][Express.js-badge]][Express.js-url]
-   [![Prisma][Prisma-badge]][Prisma-url]
-   [![PostgreSQL][PostgreSQL-badge]][PostgreSQL-url]
-   [![JWT][JWT-badge]][JWT-url]
-   [![express-validator][express-validator-badge]][express-validator-url]

<!-- BADGES -->

[Express.js-badge]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express.js-url]: https://expressjs.com/
[Prisma-badge]: https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[PostgreSQL-badge]: https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[JWT-badge]: https://img.shields.io/badge/JWT-FFB600?style=for-the-badge&logo=jsonwebtokens&logoColor=black
[JWT-url]: https://jwt.io/
[express-validator-badge]: https://img.shields.io/badge/express--validator-6A1B9A?style=for-the-badge
[express-validator-url]: https://express-validator.github.io/docs/

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

-   [x] register
-   [x] sign-in
    -   [x] access token in reponse
    -   [x] refresh token save in cookies and database
    -   [x] add cron jobs. every 24 hours the expired refresh token will be deleted

<p align="right">(<a href="#readme-top">back to top</a>)</p>
