# MongoDB Atlas Setup Guide

## Prerequisites
1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster (free tier is available)
3. Set up database access and network access

## Environment Variables
Update your environment variables to use MongoDB Atlas:

```bash
# Replace DATABASE_URL with MONGODB_URI
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/karyasiddhi?retryWrites=true&w=majority
```

## Getting Your MongoDB Atlas Connection String

1. Go to your MongoDB Atlas dashboard
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<username>`, `<password>`, and `<database>` with your actual values

## Database Name
The application will use `karyasiddhi` as the default database name. You can change this in the connection string.

## Migration Notes
Since we're switching from PostgreSQL to MongoDB:
- All SQL scripts in the `database/` folder have been removed
- Entities have been updated to use MongoDB decorators
- TypeORM will handle schema synchronization in development

## Testing the Connection
After setting up the environment variables, start the application:

```bash
cd backend
npm run start:dev
```

The application should connect to MongoDB Atlas automatically.