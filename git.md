Git

Notes from Git Real Course - 11/1/19 - https://app.pluralsight.com/course-player?clipId=dec97015-003c-4212-8a19-2625c73bb5e8

- Any command with “- - “ are actually two dashes next to each other. I just can’t show that in notes because it converts it to “—“.
- For this examples, origin is the name of the remote repo.

Git works as a way of merging work and a time capsule to go back to other states of the work.

Add Commands:

git add <list of files>
git add --all (Adds all new or modified files. So you wouldn’t need to specific file names.)
git add _.txt (add all txt files in current directory)
git add docs/_.txt [add la txt files in docs directory)
git add docs/ Add all files in docs directory
git add “\*.txt” Add all txt files in the whole project

Creating commits:

git log (This gives you the timeline history of your commit)
git log - -pretty=oneline Will give you the SHAs and commit message only
git log - -pretty=format to customize it to whatever you want
git log - -oneline -p Will should king of like get diff what lines were added, removed and modified.
git log - - oneline -stat and -graph
\*It goes into a bunch of different log formats in the last video of this series.

git diff Shows you the exact changes you’ve made to files by line. Needs to be staging area to do this. Compares to last commit. Git diff can also work a lot like git log in that it can be formatted for you to search however you’d like. Can be very specific as to how information is displayed.

git blame <filename> - Help you track down when, who and what changed were made by commit.

git checkout - - <file> This discards the recent changes to a file and restores it to it’s previous state since least commit.

git commit -a -m “commit message” This allows you to shortcut add, then commit process. Adds “-a” all tracked files to a commit. This does not add any currently untracked files.

** Don’t do these after push**

git reset HEAD <file> to unstage a file. HEAD refers to the last commit or the HEAD of our branch currently in the timeline.

git reset - -soft HEAD^ Undo last commit, put changes into staging. This undos a commit. For example, if you forgot to add something to the commit. “soft” here means reset into staging. The “^” means to move to commit before ‘HEAD’

git reset - -hard HEAD^ Undo last commit and all changes that were installing I think.

git reset - -hard HEAD^^ Undo last 2 commits and all changes

git reset — hard

git commit - -amend -m “Modify readme & add todo.txt” This allows you to ass to the last commit. Also allows you to create new commit message. Whatever has been staged will be added to the last commit.
** Don’t do the above after push**

Commits Messages: Be as descriptive as possible and keep in the present tense. Describe what the commit does.

Remotes, Pushing, Pull:

git remote add origin <git hub link> “add” refers to new remote “origin” refers to our name for this remote.
git remote add <name> <address>

git remote -v Get a list of all the remotes our local repo knows about. Show remote repositories
git remote rm <name> - Removes remote from local.

git push -u origin master “origin” remote repo name. “master” local branch to push to.

- will ask for GitHub authentication unless password is cached our using an SSH key installed.
- git push -u <name> <branch> the branch is usually master.
- “-u” specifies the name and the branch, so that next time you do just “git push” it assumes the name and branch unless otherwise specified.

git pull To get other people’s changes. Do this often.

\*\*It is not uncommon to have multiple remotes for a project. IE origin, test and production.

Cloning and Branching:

git clone <link> It will automatically be called the name the repo as called
git clone <link> <name> If you’d like to rename it locally.

Create local\* branch, when a separate team mate will be working on a specific feature:

git branch <name>
git branch Will tell you what branch you’re currently on.

git checkout <branch name> To move to another branch. This switches to a new timeline.
git checkout -b <new branch name> Creates an ew branch and automatically moves you into it.

Merging: bring one branch’s change to another.
Go back to the branch you’d like to merge to (I think).

git merge <branch name>

git branch -d (branch name> After merging, you can safely delete branch.

Collaboration:

If two people are working on a repo at the same time. If someone else pushes before you are able to pull again, you’ll have to pull and then push in order to commit changes.

What “git pull” actually does:

1. Fetch or syncs our local repo with the remote one. Same as “git fetch”. However, fetch doesn’t update any of our local code.
2. Second step of git pull merges the origin/master with local master and updates your local code. Same as running git merge origin/master

Tagging: A tag is a reference to a commit (used mostly for release versioning).
git tag To list all tags
git checkout v0.0.1 To check out code at that tag’s commit
git tag -a v0.0.3 -m “version X.X.X”
git push - -tags To push to remote, so it’s not just local.

Remote Branching:

Use these when you have branch locally you need other people to work on. You’’l need to push it up, so they can pull it down.

Also good for any branch you’re going to be working on for longer than a day in order to create a backup version.

git push origin shopping_cart To push branch up to GitHub

Pulling someone else’s branch to work on it:
git pull the repo
git branch Will still only show branches you were tracking previously
git branch -r Will list all remote branches
git checkout <branch name> Will move you into that branch and automatically start tracking it for future use.

git remote show <remote name, IE origin> Will show us all of our remote branched and whether or not we’re tracking them. Show us all our local branches and which remote branches they merge with. Lastly, shows where local branches go, when you do a git push.

git push origin :<branch name> Deletes remote branch
git branch -d <branch_name> To delete local branch, may need you to confirm

What if you push to a remote that no longer exists:
Will return “everything up-to-date” because it only update local.
git remote show origin Will should that the remote branch is “stale” as in no longer in the remote.
git remote prune origin Will clean up deleted remote branches. Good to run every now and then to clean things up.

Rebase instead of Merging:
Merge commits can pollute your timelines history. We use rebase to avoid that.

What git rebase command does:

1. Move all changes to master which are not in origin/master to a temp area.
2. Run all origin master commits over to master one at a time.
3. Runs all commits from temp area on top of master one at a time.

Instead of merge commit do this:
git fetch
git rebase

Local Branch Rebase:
git check <branch name>
git rebase master Wil 1st run master commits and then run our admin commits.
git check out master Switch to branch ‘master’
git merge <branch name> Merge branch into master.

Excluding Files:

You can use “experiments” folder for a secret place to work on stuff. This does not get committed and is private.

experiments/<filename>

.gitignore - For not committing log files, they create conflicts
For eacample logs/\*.log puts an log files into that folder to be ignored.

Removing Files:

I’m assuming this does it for both local and remote?

git rm <filename>
git status Will show changes to be committed.
git commit -m “Remove filename”

Untracking Files

git rm - -cached development.log
git status Will show it’s deleted the same way, but won’y be deleted from your local, only from Git
.gitignore logs/\*.log will ignore all log giles inside thelods directory
git add .gitignore
git commit - m “Ignore all log files”

Config:

Setting up email for current repo

git config user.email “spamme@example.com” sets email for current repo to one other than your user email
git config - -list Will show you a second email now
git config user.email To show you which email it is currently using.

Aliases: Basially creating shortcuts for commonly used commands

How to set an alias:
git config alias.<name> <command>

For example:
git config - -global alias.st status
git config - -global alias.co checkout
git config - -global alias.br branch
git config - -global alias.ci commit

Now you can use “git st” instead of “git status”

Preventing Merge Conflicts when Pairing
or just refer to…
https://frontend.turing.io/lessons/module-1/git-team-workflow.html

1. Add Colloborator (under settings > manage acess in the repo)
2. Clone down + Create Branch
   git checkout -b [feature-branch-name] (to create branch)
3. Communicate with your partner to make sure you’re not working on the same line of code.
4. Do work
5. `git push origin head`
6. Create a pull request (you never merge your own pull request or commit to master, partner will approve)
7. Partner approves and merges pull request
8. Now that master has changed, we all teammates pull down the new version of master
   1. - `git checkout master`
   2. - `git pull origin master`

clone down toilet plate
In root of project:
rm -rf .git (this removes git files and it no longer tracks)
git status: should show that the repo is not being tracked.
create respority on github.com
run git init and all the series of commands

How to create a GitHub repo that holds both the Front and Backend
Basically you create a folder that holds both previously initialized nested git repos. You push up, and then you remove the .gitignore from that folder.
Reference this video timestamps: https://youtu.be/-7IfZGaA6-Q?t=2399

If you're updating your local clone of someone's code and would like to discard
your changes before pulling down again: Error " Please commit your changes or stash them before you merge."
`git reset --hard` then pull down.
