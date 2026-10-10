@echo off
title Prisma Studio - BI-IN Facturacion
color 0B

echo ============================================
echo   Abriendo Prisma Studio para DEMO...
echo   Se abrira automaticamente en tu navegador
echo   No cierres esta ventana mientras lo usas.
echo ============================================
echo.

cd /d C:\Dev\biin-demo

npx prisma studio

pause
