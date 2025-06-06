import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export const userService = {
  async findByEmail(key: string) {
    const user = prisma.user.findFirst({
      where: {
        OR: [{ email: key }, { name: key }, { mobile: key }],
      },
    });
    return user;
  },

  async validatePassword(user: { password: string }, password: string) {
    try {
      return await bcrypt.compare(password, user.password);
    } catch {
      return false;
    }
  },

  async createUserIfNotExists({
    name,
    email,
    mobile,
    password,
    role = Role.USER,
  }: {
    name: string;
    email: string;
    mobile: string;
    password: string;
    role?: Role;
  }) {
    const existing = await this.findByEmail(email);
    if (existing) return existing;

    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
      data: {
        name,
        email,
        mobile,
        password: hashedPassword,
        role,
      },
    });
  },
};
