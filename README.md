# Cosmetic calendar version 1

https://kalinss.github.io/cosmetics-calendar/

A project helping to organize the use of skin care products

## Summary

  - [Getting Started](#getting-started)
  - [Runing the tests](#running-the-tests)
  - [Puprose](#puprose)

## Getting Started

These instructions will get you a copy of the project up and running on
your local machine for development and testing purposes. See deployment
for notes on how to deploy the project on a live system.

### Used packages
* React TypeScript
* SCSS,CSSModules
* ESLint, Babel
* ParselJS - main module manager

### Installing

A step by step series of examples that tell you how to get a development
env running

Copy this project on your machine 

    https://github.com/Kalinss/cosmetic-calendar.git

Open project and move to main directory

    cd ../cosmetic-calendar
    
Download needed packages 
    
    yarn install
    or
    npm install 

Run the project
    
    tsc --noEmit && cross-env NODE_ENV=development webpack-dev-server        

## Running the tests

Explain what these tests test and why

    "test": "jest",
    "test update snapshots": "jest --updateSnapshot"

## Purpose 
Puprose of the next update - 
Coverage code tests 90-100%
