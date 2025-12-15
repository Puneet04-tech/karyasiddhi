import * as bcrypt from 'bcrypt';

async function generateHash() {
  const password = 'password123';
  const hash = await bcrypt.hash(password, 10);
  console.log('Password hash for "password123":');
  console.log(hash);
  
  // Generate SQL
  const users = [
    { id: '550e8400-e29b-41d4-a716-446655440001', name: 'Arun Singh', email: 'arun.singh@gov.in', role: 'Department Head', designation: 'Additional Secretary' },
    { id: '550e8400-e29b-41d4-a716-446655440002', name: 'Rajesh Kumar', email: 'rajesh.kumar@gov.in', role: 'Employee', designation: 'Joint Secretary' },
    { id: '550e8400-e29b-41d4-a716-446655440003', name: 'Priya Sharma', email: 'priya.sharma@gov.in', role: 'Employee', designation: 'Director' },
    { id: '550e8400-e29b-41d4-a716-446655440004', name: 'Amit Patel', email: 'amit.patel@gov.in', role: 'Employee', designation: 'Deputy Secretary' },
    { id: '550e8400-e29b-41d4-a716-446655440005', name: 'Sneha Reddy', email: 'sneha.reddy@gov.in', role: 'Employee', designation: 'Under Secretary' },
    { id: '550e8400-e29b-41d4-a716-446655440006', name: 'Vikram Singh', email: 'vikram.singh@gov.in', role: 'Employee', designation: 'Section Officer' },
    { id: '550e8400-e29b-41d4-a716-446655440007', name: 'Deepika Roy', email: 'deepika.roy@gov.in', role: 'Employee', designation: 'Assistant Director' },
    { id: '550e8400-e29b-41d4-a716-446655440008', name: 'Rahul Verma', email: 'rahul.verma@gov.in', role: 'Employee', designation: 'Deputy Director' },
    { id: '550e8400-e29b-41d4-a716-446655440009', name: 'Anita Desai', email: 'anita.desai@gov.in', role: 'Employee', designation: 'Senior Analyst' },
    { id: '550e8400-e29b-41d4-a716-446655440010', name: 'Suresh Yadav', email: 'suresh.yadav@gov.in', role: 'Employee', designation: 'Program Officer' },
    { id: '550e8400-e29b-41d4-a716-446655440011', name: 'Kavita Nair', email: 'kavita.nair@gov.in', role: 'Employee', designation: 'Technical Officer' },
    { id: '550e8400-e29b-41d4-a716-446655440012', name: 'Manoj Gupta', email: 'manoj.gupta@gov.in', role: 'Employee', designation: 'Research Officer' },
    { id: '550e8400-e29b-41d4-a716-446655440013', name: 'Pooja Iyer', email: 'pooja.iyer@gov.in', role: 'Employee', designation: 'Administrative Officer' },
  ];
  
  console.log('\n\nSQL to insert users:');
  console.log('DELETE FROM users;');
  console.log('');
  
  for (const user of users) {
    console.log(`INSERT INTO users (id, name, email, password, role, designation, "createdAt", "updatedAt") VALUES ('${user.id}', '${user.name}', '${user.email}', '${hash}', '${user.role}', '${user.designation}', NOW(), NOW());`);
  }
}

generateHash();
