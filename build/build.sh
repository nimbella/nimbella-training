CUR=${1:?target directory}
if ! test -d "../$CUR"
then echo "$CUR does not exist" ; exit 1
fi
cd ..
rm -Rvf $CUR/pres
ipython build/convert.ipy $CUR/pres.md
rm $CUR/pres.pdf
marp --allow-local-files -I $CUR --pdf
