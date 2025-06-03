#!/bin/bash


echo "--- Running ESLint ---"
passing=true
while read file; do
    npx eslint $file --fix
    if [[ "$?" == 0 ]]; then
        git add $file
        printf "ESLint passed for $file"
    else
        printf "ESLint failed for $file"
        passing=false
    fi 
   done < <(git diff --cached --name-only --diff-filter=ACMR)
   if [[ "$passing" == false ]]; then 
       exit 1
   fi
   exit 0
