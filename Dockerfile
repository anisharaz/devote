FROM node:18-alpine AS base

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
# Replace <your-major-version> with the major version installed in your repository. For example:
# RUN yarn global add turbo@^2
RUN yarn global add turbo@^2
COPY . .

# Generate a partial monorepo with a pruned lockfile for a target workspace.
# Assuming "web" is the name entered in the project's package.json: { name: "web" }
RUN turbo prune web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

# Build the project
COPY --from=builder /app/out/full/ .
RUN yarn turbo run build --filter=web...

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
RUN addgroup --system --gid 1001 app
RUN adduser --system --uid 1001 app
RUN mkdir .next
RUN chown app:app .next
COPY --from=installer --chown=app:app /app/apps/votingsystem/next.config.js .
COPY --from=installer --chown=app:app /app/apps/votingsystem/package.json .
COPY --from=installer --chown=app:app /app/apps/votingsystem/public ./apps/votingsystem/public
COPY --from=installer --chown=app:app /app/apps/votingsystem/.next/standalone ./
COPY --from=installer --chown=app:app /app/apps/votingsystem/.next/static ./apps/votingsystem/.next/static

USER app
CMD node apps/web/server.js