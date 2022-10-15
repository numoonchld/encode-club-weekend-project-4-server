# Project Setup Recipe

```bash
# configure nvm
nvm use 16.15.1

# install nestJS-cli (unfortunately only global install available)
npm install -global @nestjs/cli

# new project cli wizard (run one dir level up)
nest new encode-club-weekend-project-4-server

# move into project folder 
cd encode-club-weekend-project-4-server

# serve project in dev mode 
npm run start:dev
```