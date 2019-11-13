# health

## Getting Started

Let’s begin by creating a new Ionic app in the CLI. Make sure that you’re working in Ionic 4!

```
$ ionic start health blank --type=angular
```

## Build Your App

The following step is to produce your web folder, a.k.a. the www directory.

```
$ ionic build --prod
```

Run this command at least once before adding the @angular/PWA package.

## Install @angular/PWA

The two things a PWA requires are a service worker and a web manifest. Angular has a package that will automatically add a service worker and a web manifest to the app.

```
$ ng add @angular/pwa
```

Rebuild your Ionic app so that your www build directory contains the new package.

```
$ ionic build --prod
```

## Deploying Your New PWA

Now, we’ll continue by hosting our progressive web app with the free and reliable Google Firebase hosting service.

```
$ npm install -g firebase-tools
$ firebase init
```

This will generate a firebase.json config file for you to adjust the deployment details.

## Configure the Firebase.json

For our final step, we must rewrite our firebase.json. Copy and paste the following code exactly as is given:

```
{
  "hosting": {
    "public": "www",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [   
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "/build/app/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000"
          }
        ]
      },
      {
        "source": "sw.js",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-cache"
          }
        ]
      }
    ]
  }
}
```

This will ensure that the service worker file itself doesn’t get cached.

Now each time you make a change on your Ionic app run the following:

```
$ ionic build --prod
```

## Deployment

Finally, type the following command into your CLI to deploy.

```
$ firebase deploy
```

## Development

```
ionic serve
```
