#Multistage Dockerfile

#This looks more or less like any other node related Dockerfile; it extends from the official node image,
#copies our package.json and installs it, then adds the working project files.
FROM node:current-alpine AS base
WORKDIR /base
COPY package*.json ./
RUN npm install
COPY . .

#This next stage is where things get interesting - this is where we compile our next app.
#Each stage of a multi-stage Dockerfile is self-contained, so we have to explicitly copy any files we want from the base step.
#This step only relates to a production build, so we're explicitly setting the NODE_ENV to production,
#copying the files from the base step, and running the build script specified in our package.json.
FROM base AS build
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /base ./
RUN npm run build

#With our app compiled, we're on to the final step: creating a lean, production-ready image.
#From the previous build step, we copy our package.json, the .next directory which contains our compiled app,
#and the directory which contains our public assets across. Finally, it installs the next package, uses it to
#start our compiled app, and exposes it at localhost:3000. The only files this final image contains are the ones
#that we copied across - the essentials - keeping it super lean. We've ditched our heavy node_modules directory,
#among other things.
FROM node:current-alpine AS production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
RUN npm install next

EXPOSE 3000
CMD npm run start
