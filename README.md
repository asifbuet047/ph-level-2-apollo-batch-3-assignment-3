# How to run this backend application (Bike rental service for Cox's bazar tourist area) locally

**Ans:** This backend project is **Bike Rental Serrvice for Cox's Bazar tourist area**. A tourist can now rent a bike for his laisure time and enjoy the beauty of our Cox's bazar sea beach. A tourist can easily sign up and log in in our platform by giving email name and phone number. Then he can rent a bike and after any time he can return the bike. Admin user can control the return of bike.

[Repo link of Bike rental service for Cox's bazar tourist area](https://github.com/asifbuet047/ph-level-2-apollo-batch-3-assignment-3)

[Live link of Bike rental service for Cox's bazar tourist area](https://ph-level-2-apollo-batch-3-assignment-3.vercel.app/)

[Project Overiew of Bike rental service for Cox's bazar tourist area](https://drive.google.com/file/d/17BvAmtj7YRoWna_2d_VT5FRIAE5SOz27/view?usp=sharing)

Technology used by this project

- Node.js
- Express.js
- Mongoose for data validation

**Follow the following procedure to run this server in your machine**

- Follow the git repo link and clone it in your at desired folder
- After cloning open VS code at that folder
- open terminal and run this command **npm init** . This install all node_modules in your current directory
- Now install all dev dependencies in **package.json** file section
- Now run the command `npm run build`. This command transpile all js code into ts in corresponding folder and use nodejs to run the server
- Create .env file in root directory

```
PORT = YOUR_DESIRED_PORT_NUMBER
MONGODB_URL = YOUR_MONGODB_SERVER_LINK
JWT_SECRECT_KEY = YOUR_JWT_SECRECT
DEFAULT_SALT_ROUNDS = YOUR_SALT_ROUND_NUMBER (for bcrypt library. Default is 8)
```

- Now run this command `npm run start:dev`. In your terminal you can see the server is listening at your port in env config file
