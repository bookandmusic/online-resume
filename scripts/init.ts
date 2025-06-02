// init.ts
import { userService } from '../src/services/user.service';
import { Role } from '@prisma/client';

export async function initDatabase() {
  const adminEmail = 'admin@example.com';

  const admin = await userService.createUserIfNotExists({
    name: 'admin',
    email: adminEmail,
    password: '123456',
    role: Role.ADMIN,
    mobile: '13800138000',
  });

  console.log(`✅ 默认管理员账号已就绪: ${admin.email}`);
}


initDatabase()
  .catch(console.error)
  .finally(() => process.exit(0));