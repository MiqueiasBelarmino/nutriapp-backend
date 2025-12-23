import { PrismaClient } from '@prisma/client';

async function testConnection() {
  const url = process.env.DATABASE_URL || 'NOT DEFINED';
  const obfuscatedUrl = url.replace(/:([^:@]+)@/, ':****@');
  
  console.log('--- Database Connection Test ---');
  console.log('Using URL:', obfuscatedUrl);
  
  const prisma = new PrismaClient();
  
  try {
    console.log('Attempting to connect...');
    await prisma.$connect();
    console.log('✅ SUCCESS: Connected to the database!');
    
    const userCount = await prisma.user.count();
    console.log('✅ SUCCESS: Query executed! User count:', userCount);
    
  } catch (error) {
    console.error('❌ FAILURE: Could not connect to the database.');
    console.error('Error details:', error.message);
    
    if (error.message.includes('closed the connection')) {
      console.log('\n💡 SUGGESTION: This error usually means:');
      console.log('1. You are missing "?sslmode=require" in your DATABASE_URL.');
      console.log('2. Your local IP is NOT whitelisted in Render Dashboard -> Access Control.');
    }
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
