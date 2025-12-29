/*
  Warnings:

  - A unique constraint covering the columns `[scope,scopeValue]` on the table `test_run` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `test_run` MODIFY `allureUrl` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `test_run_scope_scopeValue_key` ON `test_run`(`scope`, `scopeValue`);
