
# ESB Data Download

## Overview

The ESB Data Download repository is designed to facilitate the downloading of data from the ESB (Electricity Supply Board) systems. This project provides scripts and configurations to automate the data retrieval process.

## Features

- Automated data download
- Easy configuration via environment variables
- Written in JavaScript

## Prerequisites

- Node.js
- npm

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/fabrice404/esb-data-download.git
    cd esb-data-download
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Copy the example environment file and configure it:
    ```sh
    cp .env.example .env
    ```
   Edit the `.env` file with the necessary configuration.

## Usage

Run the data download script:
```sh
node index.js
```

## Configuration

The `.env` file includes the following configuration options:

- `ESB_USER`: Email address
- `ESB_PASS`: password

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
