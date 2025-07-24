# Strong Start

Matching refugees with essential services in their area.

- Project Plan: [Meta Internal Only](https://docs.google.com/document/d/1p8AbO21l867TNdRnbFJc_ECPLpQcBOtbCkj-wlA5lrY/edit?tab=t.gpih3e7owtqy)
- Live Site: [Strong Start](https://strong-start.vercel.app/)

## Project Requirements

<table>
  <tr>
   <td>Requirement
   </td>
   <td>How I addressed it
   </td>
  </tr>
  <tr>
   <td>⭐ Go beyond CodePath: Technical Challenges ⭐
   </td>
   <td>Your app provides multiple opportunities for you to solve technical challenges
<ul>

<li><a href="https://github.com/JackCampbell5/strong-start/blob/main/backend/utils/search/search-services.js">TC1: Search</a></li>

<li><a href="https://github.com/JackCampbell5/strong-start/blob/main/backend/utils/recs/rec-services.js">TC2: Recommendations </a></li>

<li><a href="https://docs.google.com/document/u/0/d/1hU_jAHVHUc9K7xqLxh4dRtvjB1Ym6WfL6J6gGTP-HHc/edit">My Approach to TC’s </a></li>
</ul>
   </td>
  </tr>
  <tr>
   <td> Database & API Integration
   </td>
   <td>Your app interacts with a database (e.g. Parse)
<ul>

<li><a href="https://github.com/JackCampbell5/strong-start/blob/main/backend/prisma/schema.prisma">Prisma Config FIle in my project</a></li>
<ul>

<li>Prisma is used to store all services, users, nonprofits, and logs

<p>
Your app integrates with at least one API (that you didn’t learn about in CodePath) – free APIs only</li>
</ul>

<li><a href="https://github.com/JackCampbell5/strong-start/blob/1a1aca32c5ee789f452269403e08e1464384bdd2/backend/utils/search/address-utils.js#L18-L49">Search Text to Validate Address </a></li>

<li><a href="https://github.com/JackCampbell5/strong-start/blob/1a1aca32c5ee789f452269403e08e1464384bdd2/backend/utils/search/direction-utils.js#L11-L43">Compute Routes for Finer Distance Calculation </a></li>

<li><a href="https://github.com/JackCampbell5/strong-start/blob/1a1aca32c5ee789f452269403e08e1464384bdd2/backend/utils/recs/services-nearby.js#L34-L65">Search Text to find Nonprofits in the Local Area</a></li>
</ul>
   </td>
  </tr>
  <tr>
   <td rowspan="2" > User Authentication
   </td>
   <td>You can log in/log out of your app as a user
<ul>

<li><a href="https://github.com/JackCampbell5/strong-start/blob/main/frontend/src/components/Login/Login.jsx">Login</a></li>

<li><a href="https://github.com/JackCampbell5/strong-start/blob/1a1aca32c5ee789f452269403e08e1464384bdd2/frontend/src/utils/fetch/nonprofitEmployeeFetchUtils.js#L92-L115">Log Out</a></li>
</ul>
   </td>
  </tr>
  <tr>
   <td>You can <a href="https://github.com/JackCampbell5/strong-start/blob/main/frontend/src/components/Register/Register.jsx">sign up with a new user profile</a>
   </td>
  </tr>
  <tr>
   <td>Visuals & Interactions
   </td>
   <td>
<ul>

<li>Your app has multiple views</li>

<li><a href="https://github.com/JackCampbell5/strong-start/pull/37">Cursor interaction</a>- Custom Tooltips on Hover</li>
<ul>

<li>There is so much response validation on the backend adding custom tooltips to each field allows the user to clearly understand what they need to put in each field, saving time and API calls. </li>
</ul>

<li><a href="https://docs.google.com/document/d/1KDZQsxmDd9B77iZajkruIK40iAgcZlKTEbLR7kCnqL0/edit#heading=h.lnm34a8w3ois">Complex Visual styling</a> - Service display. </li>
<ul>

<li>The entire point of my site is being able to find services you are looking for. By styling the service component every time a service is displayed across the site the information clearly pops out. This allows a user to quickly scan and figure out what service to use. When clicking more details the rest of the params show up quickly in an order that makes them easy to scan. </li>
</ul>

<li><a href="https://docs.google.com/document/d/1KDZQsxmDd9B77iZajkruIK40iAgcZlKTEbLR7kCnqL0/edit#heading=h.39l0ddx9vhdg">Loading state</a>- Loading button Component </li>
<ul>

<li>The button initiates a loading animation upon clicking, rendering it unclickable while data is retrieved from the server. </li>
</ul></li>
</ul>
   </td>
  </tr>
</table>

## Project Resources

### Overall:

- **Version control:** Git
- **Code editing:** VSCode
- **Run code:** [Node](https://nodejs.org/docs/latest/api/)
- **Package Manager:** [Npm](https://docs.npmjs.com/)

### Database:

- **Database type:** [PostgreSQL](https://www.postgresql.org/docs/)
- **Software(Create)-** [pgadmin4](https://www.pgadmin.org/docs/pgadmin4/latest/index.html)
  - Need to have open for database to be active in development environment

### [Backend](./backend/):

- **Configure and Modify Database:**[Prisma](https://www.prisma.io/docs)
- **Create and Edit Endpoints:**[Express ](https://expressjs.com/)
- **Manage Endpoints and test:** [Insomnia](https://docs.insomnia.rest/)

### [Frontend](./frontend/):

- **Framework:**[ React with Vanilla JS](https://react.dev/index)
- **Create project:**[Vite](https://vite.dev/guide/why)
- **Icons:** [React icons](https://react-icons.github.io/react-icons/)
