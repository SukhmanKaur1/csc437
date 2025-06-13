# Music Library App — Final Project (CSC 437)

**Deployed site:** https://skaur31.csse.dev/

## About

This is a single-page music library app that lets users:

- View albums, artists, and genres  
- Toggle dark mode  
- View a user profile  
- Navigate between pages without reloading  

Note: The app currently loads the user profile list by default. A login screen is implemented but is not set as the landing page. The current version does not support user login or signup. Profile data is static and included for demonstration purposes.

## Technologies Used

- Lit for web components  
- Vite for building the frontend  
- http-server to serve the site  
- MVU architecture (using Mustang)

## Deployment

- Built with: `npm run build -w proto`  
- Deployed on port 3000 using: `nohup npm start -w proto &`  
- Accessed through HTTPS via Nginx and csse.dev  

## Current Limitations

This version of the app is mostly complete, but the following items were not fully implemented:

- The edit profile form is wired with MVU and `<mu-form>`, but does not render correctly in the browser
- User login and signup forms are built, but not connected to backend authentication
- Profile updates do not always show up immediately without a page reload
- There is no feedback shown when the profile is successfully saved or fails to save

## Future Plans

After submission, I plan to:

- Fix rendering issues with the profile edit form
- Add feedback messages for saving success or failure
- Connect login and signup forms to the backend
- Improve the UI layout and mobile responsiveness
- Add genre-based playlist features and better filtering
