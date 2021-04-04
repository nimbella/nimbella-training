# setup svelte
cd address
# create a template
npx degit sveltejs/template web
# strip one level
echo -e "bucket:\n  strip: 1" >project.yml
cd web
# enable typescript
node scripts/setupTypeScript.js 
# include public
echo "public" >.include
cd ../..
nim project deploy address
