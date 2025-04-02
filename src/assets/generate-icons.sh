#!/bin/sh

declare -A sizes=(
    ["../../public/favicon.ico"]=48
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
    magick -background transparent -size "${sizes[$i]}x${sizes[$i]}" icon.svg "$i"
done
