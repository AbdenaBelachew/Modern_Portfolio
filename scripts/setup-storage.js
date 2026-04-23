import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import readline from 'readline';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const setupStorage = async (serviceKey) => {
  if (!supabaseUrl || !serviceKey) {
    console.error('Error: Missing Supabase URL or Service Role Key.');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  console.log('--- Initializing Zenith Storage ---');
  
  try {
    // Check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    if (listError) throw listError;

    const exists = buckets.find(b => b.name === 'projects');

    if (exists) {
        console.log('✓ Bucket "projects" already exists.');
    } else {
        console.log('Creating "projects" bucket...');
        const { error: createError } = await supabase.storage.createBucket('projects', {
            public: true,
            allowedMimeTypes: ['image/*'],
            fileSizeLimit: 5242880 // 5MB
        });
        if (createError) throw createError;
        console.log('✓ Bucket "projects" successfully created.');
    }

    console.log('\n--- Mission Accomplished ---');
    console.log('Status: ACTIVE');
    console.log('Public Access: ENABLED');
    
  } catch (err) {
    console.error('\n--- Mission Failed ---');
    console.error('Reason:', err.message);
    if (err.message.includes('403')) {
        console.error('Note: Ensure your Service Role Key is correct and has full storage permissions.');
    }
  } finally {
    process.exit(0);
  }
};

console.log('ZENITH SYSTEM // SETUP_UTILITY');
console.log('------------------------------');
rl.question('INPUT SERVICE_ROLE_KEY: ', (answer) => {
  setupStorage(answer);
  rl.close();
});
