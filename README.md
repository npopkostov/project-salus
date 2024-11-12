# **Project Salus**

## Project Overview

Using **Node.js** and **Puppeteer**, I developed a web scraper that gathers data from the Ministry of Internal Affairs’ daily bulletins. To date, the scraper has processed over **73,000 events** starting from **28.02.2015** when [https://mvr.gov.mk/dnevni-bilteni](https://mvr.gov.mk/dnevni-bilteni) started working until today. Each event is analyzed to identify the event’s **location** and **type** (e.g., physical violence, drug-related incidents, shootings, fires, or other types of events).

Each event is further analyzed to determine which department's territory the incident occurred in. If a location is mentioned in the event's description, the scraper compares it with a database of known locations. Upon a match, the location is saved along with its coordinates. Additionally, a **confidence score** is generated based on the location's proximity to the event description. This score indicates how close the event is to the marker, with higher values reflecting a more accurate location.

## **Features**

## Dashboard/Home

![Events Animation](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2U0ZXIyYXZtN2w0a2U3dngxc3k3ZzdzZXZzMGZhMmJhaHFwb2FjdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5VG8coLDXch1OR4gpb/giphy.gif)

The **Dashboard/Home** provides the user with real-time data that is updated with every scrape.
It contains the following key data:

- **Total events**: The total number of events processed by the scraper.
- **Total identified events**: The number of events for which locations and types have been successfully identified.
- **Average confidence score**: The average score reflecting the location accuracy across all events.
- **Felonies identified**: The count of events classified as serious crimes (e.g., physical violence, shootings, etc.).

Additionally, the dashboard provides two charts:

1. **Events over the years**: A chart showing the number of events that occurred across the territories of Macedonia, starting from 2015. This chart helps users track trends in event occurrences over time.
2. **Event types distribution**: A chart that displays the total count of different types of events (e.g., accidents, shootings, robberies, traffic accidents, animal bites, missing persons reports, etc.).

These visualizations give users a clear and comprehensive view of safety patterns, helping them understand the frequency and distribution of events in various regions and categories.

## **Interactive Map**

![Events Animation](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExendlNzRlcDl5cmNmeTV6dzVidXI1bjMzMXBxYTN1cjVkcGtyY2tjbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4KA9VhImrRBS9FHmoG/giphy.gif)

Each event is displayed on an interactive map with a **confidence score**. The confidence score reflects the estimated radius within which the event occurred:

- **100% confidence score**: Event occurred within **200–500m** of the marker.
- **90% confidence score**: Event occurred within **500–1,000m**.
- **60% confidence score**: Event occurred within **1,000–1,500m**.
- **50% confidence score**: Event occurred within **10 km**.
- **30% confidence score**: Event occurred within **20 km** of the map marker.

This scoring system provides users with a clearer understanding of the event’s location precision on the map.

Additionally, when users click on an event marker, detailed information about the event is presented. If the marker is not placed correctly or the event details are inaccurate, users have the ability to **report the event** by flagging it. This feature allows for better event data management and provides an interactive way for users to help improve the accuracy of the displayed events.

### Notes

A place where users can add personal or project-related notes.

### Project Info

Provides an overview and details about the current project.

### My Profile

Users can view general profile information and change their password.

## **Upcoming Features**

### **Statistics**

The **Statistics** feature will allow users to perform detailed searches and analyses of the database. This includes:

- **Occurrence Analysis**  
  Assessing how often specific types of events occur in particular locations over specific timeframes.  
  Example queries:

  - Drug-related incidents in Skopje.
  - Animal bites on Bul. "Partizanski Odredi".
  - Shootings in Bitola.
  - Identity theft in Shtip.
  - Missing persons in specific villages.

  **Hint:** Unfortunately, drug-related events have **quadrupled** in the last 3–4 years in many locations across Macedonia.

- **Comparison Analysis**  
  Evaluating relationships between events and specific days or periods.  
  Example:

  - Higher incidents during weekends or holidays.

- **Per Capita Analysis**  
  Calculating the rate of incidents (e.g., missing persons, animal bites, physical violence) **per capita** for each:
  - Region
  - Municipality
  - City
  - Village

This will help users understand how safe or unsafe different areas of Macedonia are.

---

## **Technology Stack**

## **Authentication and Authorization**

- **JWT Authentication**: The project utilizes **JSON Web Tokens (JWT)** for user authentication and securing protected routes.
- **User Registration**: Users can register and create accounts, with passwords securely encrypted using **bcrypt**. Upon successful registration, a verification email is sent to the user.
- **Email Verification**: After registration, users must verify their email address by clicking the verification link sent to their email. This ensures that the account is associated with a valid email address before granting full access to the application.
- **Protected Routes**: All routes are protected, requiring a valid JWT token to access. Unauthorized users will be redirected to the login page.

- **Role-Based Access Control**: Based on the user role (Admin or Member), different parts of the application are accessible. Admins have full access, while Members have restricted access.


### **Backend**

- **Node.js**
- **Express**

### **Scraper**

- **Node.js**
- **Puppeteer**

### **Database**

- **MongoDB**

### **Frontend**

- **React** + **Vite**
- **Tailwind**

---

## **Setup and Installation**

1. Clone the `app` branch of the repository:

   ```bash
   git clone -b app https://github.com/npopkostov/project-salus.git
   ```

2. Install Dependencies and Start the Application:

   ```bash
   cd project-salus
   npm start
   ```

3. Access the Application:

   ```bash
   http://localhost:2000/auth/login
   ```

4: Login with Example Accounts

To test the login functionality, use the following example accounts:

- **Admin Account**

  - **Username**: `useradmin`
  - **Password**: `admin`

- **Member Account**
  - **Username**: `usermember`
  - **Password**: `member`

You can use these credentials to log in and access different sections of the application based on the user roles. Or you can also create your own personal account if you like.

## Visit the Project

You can view the live version of the project by clicking the link below:

[Visit Project](https://project-salus.netlify.app/auth/login)

## **Contact Information**

Feel free to reach out if you have any questions, feedback, or suggestions!

- **Email**: [npopkostov@hotmail.com](mailto:npopkostov@hotmail.com)
- **GitHub**: [https://github.com/npopkostov](https://github.com/npopkostov)
