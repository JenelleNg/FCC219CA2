Documentation that includes: 
• Work distribution among team members 
Jing Xi - Frontend: Styling, Search bar, Likes . Post and form.
Jenelle - Backend: setting up the server, creating routes, handling database connections, authentication, and API integration. Create, edit and login pages.


• Ideation details: the problem identified, target users, and explanation of how the proposed solution addresses the problem
Problem Identified: 
Young people and families often lack a centralized platform to share advice, post events, and communicate effectively with other families. Existing solutions are either fragmented or not user-friendly.

Target Users:
- Families looking to exchange tips and advice.
- Community organizers posting family-friendly events.
- Users seeking a social platform focused on family engagement.

Proposed Solution:
Our web application provides a community platform where users can create, view posts or events. This include images, titles and detailed descriptions. Users can like, edit and delete posts.

How It Addresses the Problem:
- Centralizes communication and knowledge sharing among families.
- Provides an easy-to-use interface for creating and browsing content.
- Supports multimedia (image URLs) to make posts more engaging.


• Backend web service details (routes, endpoints, purpose, etc) 
Database: communityC219 table with columns
id(INT, pk), record_type(VARCHAR), username(VARCHAR), title(VARCHAR), details(VARCHAR), pic(VARCHAR), likes(INT)

Routes and endpoints:
/login - POST - Authenticates a user and returns a JWT token.
/allposts - GET - Retrieves all posts from the database. Requires JWT.
/createpost - POST - Creates a new post with optional image. Requires JWT.
/editpost/:id - PUT - Updates an existing post by ID.
/deletepost/:id - DELETE - Deletes a post by ID.

Authentication:
- JWT-based authentication for protected routes (/createpost).
- Tokens stored in local storage on the frontend.


• Frontend React application description (features, workflow, navigation, etc) 
Features:
- Login authentication using JWT.
- Create, view, edit, and delete posts.
- Include optional image URLs in posts.
- Like system for posts.
- Responsive design with cards/grid layout.

Workflow & Navigation:
Login Page: Users enter credentials; receive JWT on success.
Posts Page: Displays all posts/events in a grid layout with images, titles, and author.
Create Post Page: Form to create a new post; includes Record Type, Title, Details, and optional Image URL.
Edit Post Page: Pre-filled form to edit an existing post.
Post Actions: Users can like, edit, or delete posts directly from the posts page.


• The live URL where your app is hosted 



• Your team’s GitHub repository link
https://github.com/JenelleNg/C219CA2
https://github.com/JenelleNg/C219CA2ws
