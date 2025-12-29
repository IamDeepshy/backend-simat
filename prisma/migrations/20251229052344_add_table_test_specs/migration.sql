-- CreateTable
CREATE TABLE `test_specs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `testCaseId` VARCHAR(191) NOT NULL,
    `suiteName` VARCHAR(191) NOT NULL,
    `testName` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `durationMs` INTEGER NOT NULL,
    `errorMessage` VARCHAR(191) NULL,
    `screenshotUrl` VARCHAR(191) NULL,
    `lastRunAt` DATETIME(3) NOT NULL,
    `runId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `test_specs_testCaseId_key`(`testCaseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `test_specs` ADD CONSTRAINT `test_specs_runId_fkey` FOREIGN KEY (`runId`) REFERENCES `test_run`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
