# Vask

Vask is an educational video platform that allows viewers to ask questions while watching video lectures.

1. [About](#Usage)
1. [Demo](#Demo)
1. [About](#About)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Start the server](#start-the-server)
    1. [Routes](#start-the-server)
1. [Requirements](#requirements)
1. [Roadmap](#roadmap)
1. [Team](#team)

# Demo

![demo](docs/vask_demo.gif)

# About
Viewers are able to see and answer all questions. The questions are not only related to the videos in general, but tied to a defined moment inside the video, allowing for questions to pop up for other users as they watch the video. Students can then view answers for that question or answer it themselves.

In an educational environment, an instructor can check up on students' questions and gauge their understanding of the content.
It is benefical for all students to see what questions other students had while watching the same lecture. Reflecting and understanding questions and answers around a certain topic solidifies students' understanding of the subject matter.

# How it works (from a technical point of view):

When a user is posting a new question, they make a POST to '/addquestion'.
The user sends the question's video, video time, question text, and the username for the user who posted the question.
Information in POST to '/addquestion': video, time, text, username

(youtube-video-url-ending) is the "AAAAAaBcDe" part for the youtube video at "https://www.youtube.com/watch?v=AAAAAaBcDe"
Video url: "/?video=(youtube-video-url-ending)"

### Stack
NodeJS, Express, MongoDB, React / Flux , Browserify.


### Installing Dependencies

From within the root directory:

```sh
npm install
bower install
```

# Start the server

Make sure you're in the root directory.

```
gulp compile
```

## Routes

> Application routes:

/addquestion
  creates a new question in the database related to the user
/addlecture
  creates a new lecture in the database
/addanswer
  creates a new answer to a question
/votequestion
  increases the rank of a particular question
/voteanswer
  increases the rank of a particular answer
/getquestions
  returns an object with all questions and couple other infos
/getrelated
  this route is used the get the related lectures to a particular lecture. The playlist uses thos route to define the sequence of contents
/getlectureinfo
  return an object with a complete set information of a particular lecture, for instance, the lecture view uses this route to define the title of the lecture.
/getlectures
  returns an object that contains an array with all the lectures that belongs to a particular user.
/getcourses
  returns an array with all trhe courses
/addmockdata
  creates a mock data for the lectures list view. Demo purpose.
/addmockanswers
  creates a mock data for the answers of a lecture. Demo purpose.
/getUserInfo
  returns the user information
/signup
  add new user
/login
  perform user authentication

## Requirements

- Node 0.12.2

### Roadmap
- __Add courses page
- __Add dashboard

## Team

  - __Product Owner__: Bryan
  - __Scrum Master__: Kir
  - __Frontend Development Lead__: Elvio Cavalcante 
  - __Backend Development Lead__: David 

