# Starting a new project

mkdir -p addr/packages/addr
cp set.js addr/packages/addr
cp get.js addr/packages/addr
cp del.js addr/packages/addr
nim project deploy addr

# Test the actions

nim action invoke addr/set -p name Michele -p company Nimbella -p phone 392 
nim action invoke addr/get -p name Michele
nim action invoke addr/del -p name Michele
nim action invoke addr/get -p name Michele

# Get all data

cp all.js addr/packages/addr
nim project deploy addr
nim action invoke addr/all
nim action invoke addr/set -p name Michele -p company Nimbella -p phone 392 
nim action invoke addr/set -p name Mirella -p company Sciabarra -p phone 328 
nim action invoke addr/all

# Create a Svelte app

npx degit sveltejs/template addr/web
echo "public" >addr/web/.include
cp project.yml addr/
nim project deploy addr

# Render the address book

cat App1.svelte App2.svelte >addr/web/src/App.svelte
nim project deploy addr

# Add an entry

cat App1.svelte App1a.svelte App2.svelte App2a.svelte >addr/web/src/App.svelte
nim project deploy addr

# Remove an entry

cat App1.svelte App1a.svelte App1b.svelte App2.svelte App2a.svelte App2b.svelte >addr/web/src/App.svelte
nim project deploy addr


# Login

nim auth login
nim auth current

# Deploy

cd demo-projects
nim project deploy ocr
