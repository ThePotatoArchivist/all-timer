#!/bin/sh

declare -A sizes=(
    ["icons/android-chrome-192x192.png"]=192
    ["icons/android-chrome-512x512.png"]=512
    ["icons/apple-touch-icon.png"]=180
    ["icons/favicon-16x16.png"]=16
    ["icons/favicon-32x32.png"]=32
    ["icons/favicon-64x64.png"]=64
    ["icons/mstile-150x150.png"]=150
)

for i in "${!sizes[@]}"; do
    echo "Generating $i"
    inkscape -w ${sizes[$i]} -h ${sizes[$i]} icon.svg -o "$i"
done

echo "Generating favicon.ico"
magick -background transparent icons/favicon-32x32.png ../../public/favicon.ico
