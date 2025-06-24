-- CreateTable
CREATE TABLE "service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "zipcode" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "hours" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "date_needed" TEXT NOT NULL,
    "services_offered" TEXT[],
    "restrictions" TEXT NOT NULL,
    "next_steps" TEXT NOT NULL,
    "nonprofit_ID" INTEGER NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nonprofit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "logo" TEXT NOT NULL,

    CONSTRAINT "nonprofit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nonprofit_employee" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "signin_info" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nonprofit_ID" INTEGER NOT NULL,

    CONSTRAINT "nonprofit_employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refugee" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "signin_info" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "nonprofit_ID" INTEGER NOT NULL,

    CONSTRAINT "refugee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refugee_log" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "date" INTEGER NOT NULL,
    "refugee_ID" INTEGER NOT NULL,
    "nonprofit_ID" INTEGER NOT NULL,

    CONSTRAINT "refugee_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "service_name_key" ON "service"("name");

-- CreateIndex
CREATE UNIQUE INDEX "nonprofit_name_key" ON "nonprofit"("name");

-- CreateIndex
CREATE UNIQUE INDEX "nonprofit_employee_username_key" ON "nonprofit_employee"("username");

-- CreateIndex
CREATE UNIQUE INDEX "refugee_username_key" ON "refugee"("username");

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_nonprofit_ID_fkey" FOREIGN KEY ("nonprofit_ID") REFERENCES "nonprofit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nonprofit_employee" ADD CONSTRAINT "nonprofit_employee_nonprofit_ID_fkey" FOREIGN KEY ("nonprofit_ID") REFERENCES "nonprofit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refugee" ADD CONSTRAINT "refugee_nonprofit_ID_fkey" FOREIGN KEY ("nonprofit_ID") REFERENCES "nonprofit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refugee_log" ADD CONSTRAINT "refugee_log_refugee_ID_fkey" FOREIGN KEY ("refugee_ID") REFERENCES "refugee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refugee_log" ADD CONSTRAINT "refugee_log_nonprofit_ID_fkey" FOREIGN KEY ("nonprofit_ID") REFERENCES "nonprofit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
