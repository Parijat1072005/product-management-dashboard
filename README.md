## Here is the working link: ***https://product-management-dashboard-tau.vercel.app/***
## Credentials: 
Email: admin@example.com
Password: admin123


# Product Management Dashboard


A professional, full-stack admin panel designed for efficient inventory management. This project features a multi-step product creation workflow, real-time search and filtering, and secure admin authentication.


## Tech Stack


**Frontend**: Next.js 15 (App Router) for a fast, modern user experience.


**Styling**: Tailwind CSS for a high-contrast, responsive dashboard design.


**Database**: MongoDB with Mongoose for flexible and reliable data storage.


**Authentication**: NextAuth.js for secure admin-only access and session management.


**Media Storage**: Cloudinary for high-performance cloud image hosting.


**Icons**: Lucide React for a clean and consistent icon set.



## Key Features



### Secure Admin Authentication



**Protected Routes**: Only logged-in admins can access the dashboard.


**Personalized Greeting**: Displays the actual name of the logged-in admin in the sidebar and header.


**Onboarding**: Functionality to register new admin users securely.



### Inventory Control (Full CRUD)



**Multi-Step Creation**: A user-friendly 3-step form (Details, Inventory, Media) to add products.


**Advanced Editing**: Modify existing products with a pre-populated form and optional image updates.


**Cloud Cleanup**: Deleting a product automatically removes its image from Cloudinary to save space.



### Search & Smart Filtering



**Live Search**: Instantly find products by name as you type.


**Category Filter**: Narrow down items by specific categories (Electronics, Clothing, etc.).


**Low Stock Alerts**: A dedicated toggle to quickly identify products with fewer than 10 units in stock.



### Optimized User Experience



**Loading States**: Visual feedback (spinners and overlays) during login, data fetching, and product publishing.


**Instant Updates**: Uses revalidatePath to refresh the product list immediately after changes without manual page reloads.


**Error Resilience**: Includes "Cancel" buttons and error handling to ensure a smooth administrative workflow.


## Use the following stepwise to run the project


Open the command prompt and move to desktop using:


>>cd Desktop


>>git clone https://github.com/Parijat1072005/product-management-dashboard


Now go to the Desktop, right click on the folder and open it with code.


Now in the VS Code terminal go to the product-management-dashboard.


>> cd Desktop/product-management-dashboard



>>npm install



Create a .env file and put these credentials as it is inside it. ***If you don't have these credentials, go get them from their official sites, you can take help of google to get them***:


MONGODB_URI=your_mongodb_connection_string



NEXTAUTH_SECRET=your_random_secret_key_here



NEXTAUTH_URL=http://localhost:3000



CLOUDINARY_CLOUD_NAME=your_cloud_name



CLOUDINARY_API_KEY=your_api_key



CLOUDINARY_API_SECRET=your_api_secret



>>node seed.js



>>npm run dev




