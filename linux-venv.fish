#!/usr/bin/env fish
fish -C "
python3 -m venv venv
source venv/bin/activate.fish
pip install -r requirements.txt
"
