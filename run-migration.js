const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  const client = new Client({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'karyasiddhi',
  });

  try {
    await client.connect();
    console.log('✓ Connected to database');

    const sqlFile = path.join(__dirname, 'database', 'add_upload_approval_fields.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');

    console.log('Running migration...');
    await client.query(sql);
    console.log('✓ Migration completed successfully');
  } catch (error) {
    console.error('✗ Migration failed:');
    console.error('Error:', error.message);
    console.error('Details:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();
