# generating front-end
npx degit sveltejs/template py/web
# see Lesson 2 for App.svelte
cp src/App.svelte py/web/src/App.svelte
# configuring web deployment
echo "public" >py/web/.include
echo -e "bucket:\n strip: 1" >py/project.yml
# deploy and test
nim project deploy py
# check in the web browser
