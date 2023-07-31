# Create the 'gh-pages' branch if it doesn't exist
echo "------------------Creating 'gh-pages' branch------------------"
git checkout -b gh-pages

# Push the 'gh-pages' branch to the remote 'origin' repository
echo "------------------Pushing 'gh-pages' branch to remote repository------------------"
git push --set-upstream origin gh-pages
