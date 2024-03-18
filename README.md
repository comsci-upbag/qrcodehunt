# [qrcodehunt](https://qrcodehunt.vercel.app)

COMSCI&#8203;@UP.BAG's project for the QR Code Hunt 2023 at the University of the Philippines Baguio. The website is available at [qrcodehunt.vercel.app](https://qrcodehunt.vercel.app).

## Dependencies

- [Node.js](https://nodejs.org/en/) (v18.17.1 or higher)
- [Git](https://git-scm.com/) (v2.32.0 or higher)
- [Docker](https://www.docker.com/) (v20.10.7 or higher)

## Development

Also, check out the [SvelteKit](https://kit.svelte.dev) documentation to learn more about the framework used in this project.

```bash
# clone this repository
git clone https://github.com/comsci-upbag/qrcodehunt

# change directory into the root folder of the application
cd qrcodehunt

# install dependencies (required only on first run or after every update on package.json)
npm install
```

To be able to start running the project, you'll need to create a `.env` file in the root folder of the application. This file will contain the environment variables needed to run the application. You can find the content of the `.env` file at the organization's Messenger group chat. Now that you have the `.env` file, you can start editing the project with the code editor of your choice and run the following commands to start the development server:

```bash
# start the server
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```
