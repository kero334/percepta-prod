require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function runTests() {
  console.log("=========================================");
  console.log("🚀 STARTING E2E DATABASE TESTS");
  console.log("=========================================\n");

  const results = {
    publicForms: { insert: null, read: null },
    publicCMS: { read: null },
    rbac: { viewerInsert: null, adminEscalation: null },
    errors: []
  };

  // 1. Test Public Insert (Waitlist)
  console.log("🧪 Test 1: Public Waitlist Insert (Expected: SUCCESS)");
  const testEmail = `test_${Date.now()}@example.com`;
  const { error: waitlistInsertErr } = await supabase.from('waitlist').insert([
    { email: testEmail, first_name: 'Test', last_name: 'User' }
  ]);
  if (waitlistInsertErr) {
    console.error("❌ FAILED:", waitlistInsertErr.message);
    results.publicForms.insert = 'FAILED';
    results.errors.push(waitlistInsertErr.message);
  } else {
    console.log("✅ PASSED");
    results.publicForms.insert = 'PASSED';
  }

  // 2. Test Public Read (Waitlist) - Should Fail due to RLS
  console.log("\n🧪 Test 2: Public Waitlist Read (Expected: RLS DENY / EMPTY)");
  const { data: waitlistData, error: waitlistReadErr } = await supabase.from('waitlist').select('*');
  if (waitlistReadErr) {
      console.log("✅ PASSED (Error returned: " + waitlistReadErr.message + ")");
      results.publicForms.read = 'PASSED';
  } else if (!waitlistData || waitlistData.length === 0) {
      console.log("✅ PASSED (Empty array returned - RLS Active)");
      results.publicForms.read = 'PASSED';
  } else {
      console.error("❌ FAILED: Public user could read waitlist data!");
      results.publicForms.read = 'FAILED';
  }

  // 3. Test Public Read CMS (Resources) - Should succeed (empty or published only)
  console.log("\n🧪 Test 3: Public CMS Read (Expected: SUCCESS)");
  const { error: cmsReadErr } = await supabase.from('resources').select('*');
  if (cmsReadErr) {
    console.error("❌ FAILED:", cmsReadErr.message);
    results.publicCMS.read = 'FAILED';
    results.errors.push(cmsReadErr.message);
  } else {
    console.log("✅ PASSED");
    results.publicCMS.read = 'PASSED';
  }

  // 4. Authenticated RBAC Testing (Viewer Role)
  console.log("\n🧪 Test 4: Creating Authenticated Test User...");
  const authEmail = `e2e_${Date.now()}@example.com`;
  const authPassword = 'Password123!';
  
  const { data: authData, error: authErr } = await supabase.auth.signUp({
    email: authEmail,
    password: authPassword
  });

  if (authErr) {
    console.error("⚠️ COULD NOT CREATE TEST USER:", authErr.message);
    console.log("Skipping RBAC tests (Requires email confirmation disabled or valid credentials).");
    results.errors.push("Auth Setup Failed: " + authErr.message);
  } else {
    console.log("✅ Test user created. Running authenticated tests as default 'Viewer' role...");

    // Test 5: Viewer trying to insert into CMS
    console.log("\n🧪 Test 5: Viewer CMS Insert (Expected: RLS DENY)");
    const { error: viewerInsertErr } = await supabase.from('resources').insert([
        { title: 'Hacked Resource', slug: 'hacked', status: 'Published' }
    ]);
    if (viewerInsertErr) {
        console.log("✅ PASSED (Blocked by RLS: " + viewerInsertErr.message + ")");
        results.rbac.viewerInsert = 'PASSED';
    } else {
        console.error("❌ FAILED: Viewer was able to insert CMS content!");
        results.rbac.viewerInsert = 'FAILED';
    }

    // Test 6: Viewer trying to elevate to Admin
    console.log("\n🧪 Test 6: Viewer Privilege Escalation (Expected: RLS DENY)");
    const { error: elevateErr } = await supabase.from('user_roles').insert([
        { user_id: authData.user.id, role: 'admin' }
    ]);
    if (elevateErr) {
        console.log("✅ PASSED (Blocked by RLS: " + elevateErr.message + ")");
        results.rbac.adminEscalation = 'PASSED';
    } else {
        console.error("❌ FAILED: Viewer was able to self-assign admin role!");
        results.rbac.adminEscalation = 'FAILED';
    }
  }

  console.log("\n=========================================");
  console.log("📊 FINAL REPORT");
  console.log(JSON.stringify(results, null, 2));
  console.log("=========================================");
}

runTests();
