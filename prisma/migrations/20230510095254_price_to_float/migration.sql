/*
  Warnings:

  - The `min_price` column on the `SeatClass` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `normal_price` column on the `SeatClass` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `max_price` column on the `SeatClass` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "SeatClass" DROP COLUMN "min_price";
ALTER TABLE "SeatClass" ADD COLUMN     "min_price" FLOAT8;
ALTER TABLE "SeatClass" DROP COLUMN "normal_price";
ALTER TABLE "SeatClass" ADD COLUMN     "normal_price" FLOAT8;
ALTER TABLE "SeatClass" DROP COLUMN "max_price";
ALTER TABLE "SeatClass" ADD COLUMN     "max_price" FLOAT8;
