// 修改导入方式为默认导入
import CredentialsProvider from 'next-auth/providers/credentials'; 
// 原业务逻辑保持不变
import { userService } from '@/services/user.service';

export const credentialsProvider = CredentialsProvider({
  name: 'Credentials',
  credentials: {
    email: { label: 'Email', type: 'text' },
    password: { label: 'Password', type: 'password' }
  },
  async authorize(credentials) {
    if (!credentials?.email || !credentials?.password) {
      throw new Error('Missing credentials');
    }

    const user = await userService.findByEmail(credentials.email);
    if (!user || !await userService.validatePassword(user, credentials.password)) {
      throw new Error('Invalid credentials');
    }

    if (!user.isActive) {
      throw new Error('User is inactive');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      mobile: user.mobile,
      role: user.role
    };
  }
});