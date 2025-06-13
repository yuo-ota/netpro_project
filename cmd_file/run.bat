@echo off
start cmd /k "cd ../frontend && npm install && npm run dev"
start cmd /k "cd ../backend && mvn clean install && mvn spring-boot:run"