LOCAL REPO
• STAGING

    - git status // tells us the tracked changes/returns a list of what files we have changed in the cwd, and whether they are added to staging for a commit or not
    - git add -A // adds all the changed files to staging)
    - git add index.html // single file staging example: adds only the index.html file to staging

• COMMIT

    - git commit -m 'Made the header orange and removed a line of text.' // commits all staged files to git, with a comment about the changes

• ROLLBACK/REVERT

    - git checkout -- . // restores repo to most previous commit

SERVER REPO

    - git remote -v // checks the push/pull targets of the current repo
    - git remote add origin https://github.com/thomasmatlock/Warp-App.git // sets github repo target to push/pull to/from
    - git push origin master // pushes entire local repo to the github server repo

REVISION

    - git log --oneline // prints list of commits w/ comments
    - git fetch –all // pulls entire server repo
    - git reset --hard origin/master // OVERWRITES everything local with master server repo
    - git reset --hard origin/<branch_name> // OVERWRITES everything local with branch_name repo
