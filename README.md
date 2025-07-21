# Mon Réseau (Front-end)

You can find all the code of the app/web app "Mon Réseau" in this repo.

The app is accessible [here](https://ns3093511.ip-54-36-122.eu/).

![Logo](https://ns3093511.ip-54-36-122.eu/assets/assets/images/white-logo.969fe893298bfeee352c251c89759a1a.png)

## Environment Variables

To run this project, you will need to add the following **environment variables** to your .env file :

**`EXPO_PUBLIC_API_URL`** (url to your back-end)

**`EXPO_PUBLIC_API_KEY`** (which needs to match the API_KEY of the back-end)

## Run Locally

### Installation

- Clone the project

```bash
  git clone https://github.com/Monreseauapp/app-front.git
```

- Go to the project directory

```bash
  cd app-front
```

- Install dependencies

```bash
  npm install
```

### Start the app

To start **web** only :

```bash
  npm run web
```

To start **android** only :

```bash
  npm run android
```

To start **iOS** only :

```bash
  npm run ios
```

To start all of them :

```bash
  npm run start
```

### Access the app

**Web** : `localhost:8081` or `ip:8081`

**Mobile** : If you have a running emulator, it should automatically launch the app on the emulator or follow these steps :

I. Download the _[Expo Go](https://expo.dev/go)_ on your phone.

II. Scan the qrcode that appears, in your console, when launching the app or enter the link, which should be : `exp://ip:8081`.

## Tech Stack

[**Client:**](https://github.com/Monreseauapp/app-front) React Native, Expo

[**Server:**](https://github.com/Monreseauapp/app-back) Nest.JS

## Authors

- **[@Maxime-Labbe](https://github.com/Maxime-Labbe)**
- **[@Zogeek](https://github.com/zogeek)**
