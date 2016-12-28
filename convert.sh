#!/bin/bash

src=../minibot-engine/src/minibot
dest=src/minibot
folders="core display engine event geom graphics resource"

for f in $folders; do
  echo "Processing Folder: $f"
  rm -Rf $dest/$f
  cp -R $src/$f $dest
  for i in `find $dest/$f -name '*.js'`; do
    echo $i;
    python convert_code.py $i > $i.es;
    mv $i.es $i;
  done;
done;

