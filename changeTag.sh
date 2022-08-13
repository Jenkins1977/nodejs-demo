#!/bin/bash
rm deployment2.yml
sed "s/tagVersion/$1/g" deployment.yml >> deployment2.yml
