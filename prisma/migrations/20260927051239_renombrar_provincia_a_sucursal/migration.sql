/*
  Warnings:

  - You are about to drop the column `provincia` on the `Factura` table. All the data in the column will be lost.
  - Added the required column `sucursal` to the `Factura` table without a default value. This is not possible if the table is not empty.

*/
-- RenameColumn
ALTER TABLE `Factura` RENAME COLUMN `provincia` TO `sucursal`;
