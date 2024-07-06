FROM node:18-alpine AS base


FROM base AS builder
ARG KINDE_ISSUER_URL="override_me"
ARG KINDE_CLIENT_ID="override_me"
ARG KINDE_CLIENT_SECRET="override_me"
ENV KINDE_ISSUER_URL ${KINDE_ISSUER_URL}
ENV KINDE_CLIENT_ID ${KINDE_CLIENT_ID}
ENV KINDE_CLIENT_SECRET ${KINDE_CLIENT_SECRET}
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN yarn global add turbo@^2
COPY . .
RUN touch ./apps/votingsystem/.env && echo "KINDE_ISSUER_URL=${KINDE_ISSUER_URL}" > ./apps/votingsystem/.env && echo "KINDE_CLIENT_ID=${KINDE_CLIENT_ID}" >> ./apps/votingsystem/.env && echo "KINDE_CLIENT_SECRET=${KINDE_CLIENT_SECRET}" >> ./apps/votingsystem/.env
RUN turbo prune web --docker


FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat 
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install
COPY --from=builder /app/out/full/ .
RUN cd ./packages/prismadb && npx prisma generate && cd ../..
RUN yarn turbo run build --filter=web...


FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
RUN addgroup --system --gid 1001 app
RUN adduser --system --uid 1001 app
RUN mkdir .next
RUN chown app:app .next
COPY --from=installer --chown=app:app /app/apps/votingsystem/next.config.mjs .
COPY --from=installer --chown=app:app /app/apps/votingsystem/package.json .
COPY --from=installer --chown=app:app /app/apps/votingsystem/.next/standalone ./
COPY --from=installer --chown=app:app /app/apps/votingsystem/.next/static ./apps/votingsystem/.next/static

USER app
CMD node apps/votingsystem/server.js