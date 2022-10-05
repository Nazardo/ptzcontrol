# PTZ Control

An Angular application that interacts with an IP camera's **ISAPI** interface.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

Production build with:

    ng build --aot=true --configuration production --localize

## Proxy configuration

Rules shall be added on the local web server so that the `/ISAPI` path is proxied to the camera's IP address.
