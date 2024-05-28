cd "$(dirname "$0")"
pwd

git config user.name "Arturs Sosins"
git config user.email "ar2rsawseen@gmail.com"

export COMMIT_MESSAGE=`date`
git add .
git commit -m "$COMMIT_MESSAGE"
git push origin main