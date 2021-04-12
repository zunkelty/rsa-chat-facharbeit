# RSA-Chat-Facharbeit

An app that uses RSA to teach how asymmetric encryption is in end-to-end encryption.

Fork from [@crsandeep/simple-react-full-stack](https://github.com/crsandeep/simple-react-full-stack).

## Setup

Before using the app you must add an enviromental variable called *ADMIN_CODE*. This code is used to set a "secret" password that enables the presentator/admin to access the admin console.

The admin console can be found under */admin?admin=<YOUR_ADMIN_CODE>*.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/zunkelty/rsa-chat-facharbeit.git

# Go inside the directory
cd rsa-chat-facharbeit

# Install dependencies
yarn (or npm install)

# Start development server
yarn dev (or npm run dev)

# Build for production
yarn build (or npm run build)

# Start production server
yarn start (or npm start)
```

## License
[ISC](https://choosealicense.com/licenses/isc/)
