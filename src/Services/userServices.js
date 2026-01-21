const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Mengambil daftar user berdasarkan role tertentu
const getUsersByRole = async (role) => {
  return prisma.user.findMany({
    where: { role },
    select: { id: true, username: true },
  });
};


// Mencari user berdasarkan username untuk login
const findUserByUsername = async (username) => {
  return prisma.user.findUnique({
    where: { username },
  });
};

// Mengambil data user tanpa field sensitif (password, token, dll)
const getSafeUserById = async (userId) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      role: true,
    },
  });
};

// Mengambil data user lengkap (termasuk password, token, dll) untuk update profile
const findUserById = async (userId) => {
  return prisma.user.findUnique({
    where: { id: userId },
  });
};

// Memeriksa apakah username sudah dipakai oleh user lain
const isUsernameTaken = async (username, userIdToExclude) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      username,
      NOT: { id: userIdToExclude },
    },
  });

  return !!existingUser;
};

// Memperbarui data user berdasarkan userId
const updateUserById = async (userId, updateData) => {
  return prisma.user.update({
    where: { id: userId },
    data: updateData,
  });
};

module.exports = {
  getUsersByRole,
  findUserByUsername,
  getSafeUserById,
  findUserById,
  isUsernameTaken,
  updateUserById,
};
