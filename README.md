

# **Connecting Daily Wage Workers to Providers**  
A Comprehensive App for Both Smartphone and Non-Smartphone Users  

## **Project Overview**  
This platform addresses employment challenges faced by daily wage workers, ensuring accessibility for both smartphone and non-smartphone users. It leverages modern web technologies and machine learning algorithms to provide efficient job-worker matching, multilingual support, geolocation services, and secure communication through USSD and IVR technologies.

---

## **Features**  
- **Inclusive Accessibility**: Seamless communication for both smartphone and non-smartphone users using USSD and IVR.  
- **Real-Time Job Matching**: Powered by K-Nearest Neighbors (KNN) and Content-Based Filtering for personalized recommendations.  
- **Geolocation Services**: Real-time job availability and worker tracking for efficient allocation.  
- **Multilingual Support**: User-friendly interface catering to diverse regions and languages.  
- **Secure Payments**: Transparent and reliable payment system for trust-building.  
- **Rating and Review System**: Promoting trust and transparency between job providers and workers.  
- **Responsive Web Application**: Ensuring a smooth experience across devices.  

---

## **Technology Stack**  

### **Frontend**  
- **React.js**: User interface design and interactive components.  
- **Redux**: State management for seamless user interactions.  
- **telwind CSS**: Responsive and visually appealing design.  

### **Backend**  
- **Node.js**: Server-side scripting.  
- **Express.js**: API handling and middleware integration.  

### **Database**  
- **MongoDB**: NoSQL database for efficient data storage and retrieval.  

### **Machine Learning**  
- **KNN Algorithm**: Optimized job-worker matching.  
- **Content-Based Filtering**: Personalized job recommendations.  

### **Other Technologies**  
- **USSD & IVR**: Communication support for non-smartphone users.  
- **Geolocation API**: Real-time location tracking.  
- **JWT Authentication**: Secure login and user authentication.  


---

## **Installation and Setup**  

1. **Clone the repository**:  
   ```bash
   git clone https://github.com/your-repo.git
   cd project-folder
   ```

2. **Install dependencies**:  
   For the client:  
   ```bash
   cd client
   npm install
   ```  
   For the server:  
   ```bash
   cd server
   npm install
   ```

3. **Start the development server**:  
   Start the backend:  
   ```bash
   cd server
   npm start
   ```  
   Start the frontend:  
   ```bash
   cd client
   npm start
   ```

4. **Environment Variables**:  
   Create a `.env` file in the server folder with the following variables:  
   ```plaintext
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   PORT=5000
   ```

---

## **Contributors**  
- **Siddhant Deshmukh** 
- **Tanavi Narkhede**   
- **Akanksha Shevkari**  
- **Shubham Godambe**  

