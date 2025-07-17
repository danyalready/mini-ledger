# mini-ledger

**mini-ledger** is a simple blockchain implementation built for learning and experimentation. It demonstrates the core concepts behind blockchain technology—like blocks, hashing, proof-of-work, and immutability—without the complexity of a full cryptocurrency or distributed network.

## Features

-   Block creation with data and timestamp
-   SHA-256 hashing for blocks
-   Basic proof-of-work mechanism
-   Chain validation to ensure integrity
-   Simple CLI/console-based interaction (if applicable)

## Minimal Functionality

-   Block – Contains transactions, a hash, and a reference to the previous block
-   Blockchain – An array of valid, linked blocks
-   Proof-of-Work (PoW) – Mining new blocks with a configurable difficulty level
-   P2P Networking – Node-to-node communication via WebSockets
-   API – REST API for interacting with the node (e.g., submitting transactions, querying the chain)
-   Signatures – Cryptographic signatures to verify transaction authenticity
-   Mempool – A queue of unconfirmed transactions waiting to be mined

## Purpose

This project is built as a personal learning exercise to understand how blockchains work under the hood. It's not intended for production use, but rather to reinforce core concepts like:

-   How block hashes secure the chain
-   Why consensus and proof-of-work matter
-   How data is stored and verified in blocks
