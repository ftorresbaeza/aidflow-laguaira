-- Migration: add_proveedor_support
-- Adds: validUntil to qrs, requiresCheckout to qr_description_types,
--        checkOutTime + checkOutGuardId to check_ins, new indexes

-- Add validUntil to QR table
ALTER TABLE "qrs" ADD COLUMN "validUntil" TIMESTAMP(3);

-- Add requiresCheckout to QRDescriptionType table
ALTER TABLE "qr_description_types" ADD COLUMN "requiresCheckout" BOOLEAN NOT NULL DEFAULT false;

-- Add checkout fields to CheckIn table
ALTER TABLE "check_ins" ADD COLUMN "checkOutTime" TIMESTAMP(3);
ALTER TABLE "check_ins" ADD COLUMN "checkOutGuardId" TEXT;

-- Add FK constraint for checkOutGuardId
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_checkOutGuardId_fkey"
  FOREIGN KEY ("checkOutGuardId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- New indexes
CREATE INDEX "qrs_validDate_validUntil_idx" ON "qrs"("validDate", "validUntil");
CREATE INDEX "check_ins_checkOutTime_idx" ON "check_ins"("checkOutTime");
CREATE INDEX "check_ins_personId_checkOutTime_idx" ON "check_ins"("personId", "checkOutTime");
