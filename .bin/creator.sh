#!/bin/bash

function renameFileOrDirByPath {

  path=$1

  newPath=${path/${sourceName}/${targetName}};
  newPathLowerCase=${path/$sourceNameLowerCase/$targetNameLowerCase};

  # checking if we need rename folder in original
  if [ "$path" != "$newPath" ]; then
    mv $path $newPath
    export current_folder="$newPath"
    echo $newPath
  elif [ "$path" != "$newPathLowerCase" ]; then  # checking if we need rename folder in Lower case
    mv $path $newPathLowerCase
    export current_folder="$newPathLowerCase"
    echo "${newPathLowerCase}";

  else
    current_folder="$path"
    echo $path
  fi
}

function replaceFileContent {
  file=$1

  echo $file;

  if [[ $file == *.js || $file == *.jsx ]] ; then
    sed "s/$sourceName/$targetName/g" $file | sudo tee $file
    sed "s/$sourceNameLowerCase/$targetNameLowerCase/g" $file | sudo tee $file
  fi
}

function renameDirs {
  path="${1}/*"

  #rename all dirs
  for name in $path ; do
        if [ -d "$name" ]; then #if it's a directory
          renameFileOrDirByPath $name
        fi
  done
}

function renameFiles {

  path="${1}/*"

  #rename all files
  for name in $path ; do
        if [ ! -d "$name" ]; then #if it's not a directory
          newName=$(renameFileOrDirByPath $name);
          replaceFileContent "${newName}"
        fi
  done

}

#replace content in files
function replaceContentInFiles {

  path="${1}/*"

  for name in $path ; do
      if [ ! -d "$name" ]; then #if it's a file
      echo "----${name}"
        replaceFileContent $name
      fi
  done
}

#renameAllRecursively $parent_path
function create {

    #set global variables
    export APP_ROOT="$( cd "$(dirname "../${BASH_SOURCE[0]}")" ; pwd -P )";
    export sourceName="Reports";
    export sourceNameLowerCase=${sourceName,,};

    export targetName=${1}
    targetNameLowerCase=$(echo ${targetName} | sed -r 's/([a-z0-9])([A-Z])/\1-\L\2/g')
    export targetNameLowerCase=${targetNameLowerCase,,};

    targetFolder="${APP_ROOT}/src/components/${targetNameLowerCase}";
    sourceFolder="${APP_ROOT}/src/components/${sourceNameLowerCase}";

    #clone sample folder
    cp -r $sourceFolder $targetFolder

    renameDirs $targetFolder
    renameFiles $targetFolder
}


"$@"
#bash ./.bin/creator.sh create Tor