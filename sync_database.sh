#!/usr/bin/env bash

set -euo pipefail

python ./src/python/bibtex_loader.py
python ./src/python/sync_database.py
