# Vask

Vask is an educational video platform that allows viewers to ask questions while watching video lectures.
Viewers are able to see and answer all questions. The questions are not only related to the videos in general, but tied to a defined moment inside the video, allowing for questions to pop up for other users as they watch the video. Students can then view answers for that question or answer it themselves.

In an educational environment, an instructor can check up on students' questions and gauge their understanding of the content.
It is benefical for all students to see what questions other students had while watching the same lecture. Reflecting and understanding questions and answers around a certain topic solidifies students' understanding of the subject matter.

# How it works (from a technical point of view):

When a user is posting a new question, they make a POST to '/addquestion'.
The user sends the question's video, video time, question text, and the username for the user who posted the question.
Information in POST to '/addquestion': video, time, text, username

(youtube-video-url-ending) is the "AAAAAaBcDe" part for the youtube video at "https://www.youtube.com/watch?v=AAAAAaBcDe"
Video url: "/?video=(youtube-video-url-ending)"

# How to start the test server

Make sure you're in the root directory.

```
npm install
bower install
gulp compile
```
