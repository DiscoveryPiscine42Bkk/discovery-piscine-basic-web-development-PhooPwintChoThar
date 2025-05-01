#!/bin/bash

i=0

for arg
do 
    if [ $i -lt 3 ]
    then
         mkdir "ex$arg"
         i=$(($i +1))
    fi

done
    if [ $i -eq 0 ]
    then 
        echo "No argument supplied"
    fi