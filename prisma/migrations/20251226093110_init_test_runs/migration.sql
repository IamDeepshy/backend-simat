-- CreateTable
CREATE TABLE `test_run` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `scope` VARCHAR(191) NOT NULL,
    `scopeValue` VARCHAR(191) NOT NULL,
    `totalPass` INTEGER NOT NULL,
    `totalFail` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `allureUrl` VARCHAR(191) NOT NULL,
    `executedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
