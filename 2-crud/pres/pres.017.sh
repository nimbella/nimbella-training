## examples of incremental update
# edit frontend
vi encoder/web/index.html
# deploy only changed files
nim project deploy encoder --incremental
# edit backend
vi encoder/packages/default/binary.js
# deploy excluding web folder
nim project deploy encoder --exclude=web
