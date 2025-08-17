/*
  Warnings:

  - You are about to drop the column `avatar` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `passwordHash` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `avatar`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    MODIFY `role` ENUM('USER', 'ADMIN', 'DEVELOPER') NOT NULL DEFAULT 'USER',
    MODIFY `passwordHash` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_name_key` ON `User`(`name`);
