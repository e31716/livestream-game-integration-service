# Livestream Game Integrated Service - Frontend

This repository is just for code review, so some parts of code, assets and setting files are removed which means this project is unable to run successfully.

## Introduction

This is a service for the integration of live video streaming and games. Through our integration, players can play games while interacting with anchors in the livestreaming chatroom and thereby increase the player stickiness to the game. 

## Feature module introduction

The main features in the folder `src/app/feature` are listed below with brief description:

* **dsg/fighter**: the entrances for different games which include some custom settings such as theme, gametype or game aspect ratio information. 
* **game-live**: middle abstract layer for different kinds of layouts arrangement. There are two kinds of layouts for now:
    * **game-live-dlml**: if the game need to show landscape orientation both on PC and mobile devices.
    * **game-live-dlmp**: if the game need to show landscape orientation on PC and show portrait orientation on mobile devices.
* **live-chat**: combination of chatroom and live video streaming components.
* **game-display**: responsible for displaying game UI from game providers.
