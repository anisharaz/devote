# A blockhain Based Voting System 
- It uses digital certificates to verify the identity of the voter.
- It uses blockchain token to store the votes.

# The architecture Consist of 2 systems:
- Identity System
![Identity_system](https://github.com/anisharaz/devote/assets/105302254/9f482fa2-2134-4644-8b9f-53f7f04d4389)

- Voting System
![Voting_system](https://github.com/anisharaz/devote/assets/105302254/685a3f6a-469d-4489-8afc-b3b2cfdf20b7) 

# Setting Up the project

> [!IMPORTANT]
> The project uses [Turbo](https://turbo.build/) to manage monorepo. The ui package inside `/packages/ui/` uses [Tailwind css](https://tailwindcss.com/) and [Shadcn/ui](https://ui.shadcn.com/), so you can make any component in this package and just export that in the index.ts file. Your can see the existing components as reference.


Step-1: In root dir `/` run these commands
```bash
yarn install
```

Step-2.1: In dir `/packages/prismadb/` run these commands
```bash
1. docker compose up -d
2. cp .env-example .env
3. npx prisma migrate dev --name init
4. npx prisma generate
```

Step-2.2: In dir `/packages/prismadb/` run these commands
> [!IMPORTANT]
> NOTE: edit the /packages/prismadb/prisma/seed/seed.ts file accordingly before running below command

```bash
npx prisma db seed
```


Step-3: In dir `/apps/votingsystem/` run these commands
> [!IMPORTANT]
> NOTE: add values to env file accordingly

```bash
cp .env-example .env
```

Step-4: In root dir `/` run these commands
```bash
yarn dev
```

> [!TIP]
> if you do not update files in /packages frequently than you can run `yarn dev` in /apps/votingsystem/ only and if you change files in /packages/ run `yarn build` once in that package and you are good to go. 

## Tips
Using `yarn dev` in root dir `/` is resource consuming so you can run `yarn dev` only in the packages whose files are continuously changing. for Eg. in `/packages/ui/` and obviously in `/apps/votingsystem/`

