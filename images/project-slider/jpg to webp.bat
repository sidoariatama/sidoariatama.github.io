@echo off
cd /d G:\My Drive\sidoariatama.github.io\images\project-slider
for %%i in (*.jpg) do cwebp -q 80 "%%i" -o "%%~ni.webp"
echo Konversi selesai!
pause