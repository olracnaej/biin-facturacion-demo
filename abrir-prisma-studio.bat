@echo off
title Prisma Studio - BI-IN Facturacion
color 0B

echo ============================================
echo   Abriendo Prisma Studio...
echo   Se abrira automaticamente en tu navegador
echo   No cierres esta ventana mientras lo usas.
echo ============================================
echo.

cd /d C:\Dev\biinfactura-v2

npx prisma studio

pause
