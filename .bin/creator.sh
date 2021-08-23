#!/bin/bash

function renameFileOrDirByPath {

  path=$1

  newPath=${path/Sample/Tor}
  newPathLowerCase=${path/$sourceNameLowerCase/$targetNameLowerCase}

  # checking if we need rename folder in original
  if [ "$path" != "$newPath" ]; then
    mv $path $newPath
    export current_folder="$newPath"
  elif [ "$path" != "$newPathLowerCase" ]; then  # checking if we need rename folder in Lower case
    mv $path $newPathLowerCase
    export current_folder="$newPathLowerCase"

  else
    current_folder="$path"
  fi
}

function replaceFileContent {
  file=$1
  if [[ $file == *.js || $file == *.jsx ]] ; then
    sed "s/$sourceName/$newsourceName/g" $file | sudo tee $file
    sed "s/$sourceNameLowerCase/$newsourceNameLowerCase/g" $file | sudo tee $file
  fi
}

function renameFiles {

  path="${1}/*"

  #rename all dirs and files
  for name in $path ; do
        if [ -d "$name" ]; then #if it's a directory
          renameFileOrDirByPath $name
          echo "-----${name}--11${current_folder}"
          renameFiles $current_folder
        else #if it's a file
          renameFileOrDirByPath $name
        fi
  done

  for name in $path ; do
      if [ ! -d "$name" ]; then #if it's a file
      echo 99
        #replaceFileContent $name
      fi
  done
}

#renameAllRecursively $parent_path
function create {

    #set global variables
    export sourceName="Sample";
    export sourceNameLowerCase=${sourceName,,};

    export targetName=${1}
    export targetNameLowerCase=${targetName,,};

    targetFolder="$(dirname "${BASH_SOURCE[0]}")/src/components/${targetName}"
    sourceFolder="$(dirname "${BASH_SOURCE[0]}")/src/components/${sourceName}"

    #clone sample folder
    cp -r $sourceFolder $targetFolder

    renameFiles $targetFolder
}

"$@"
#creator.sh create Tor