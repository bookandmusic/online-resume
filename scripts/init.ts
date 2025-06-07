import { userService } from '../src/services/user.service';

export async function initDatabase() {
  const adminEmail = 'admin@example.com';
  const adminPassword = '123456';

  await userService.createUserIfNotExists({
    name: 'admin',
    email: adminEmail,
    password: adminPassword,
    role: "ADMIN",
    mobile: '13800138000',
  });

  console.log(`✅ 默认管理员账号已就绪: ${adminEmail},密码: ${adminPassword}`);
}


initDatabase()
  .catch(console.error)
  .finally(() => process.exit(0));