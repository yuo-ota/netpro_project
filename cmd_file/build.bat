@echo off

start cmd /k "cd ../frontend && npm run build && xcopy /E /Y /I dist\* ..\backend\src\main\resources\static\ && cd ../backend && mvn clean install && copy .\target\*.jar ..\ && cd ../cmd_file"