# Vask

Vask is an educational video platform that allows viewers to ask questions at any point while watching videos.
Viewers are able to see and answer all questions.  The questions are not only related to the videos in general, but tied to a defined moment inside the video.  This allows to raise very specific questions.

In an educational environment an instructor can check up on the questions and gauge their understanding of the content.
It is benefical for all students to see what questions came up while watching a video.  Reflecting and understanding questions and answers around a certain topic, solidifies the subject matter.

# How it works (from a technical point of view):

When a user is posting a new question, they make a POST to '/addquestion'.
The user sends the question's video, video time, question text, and the username for the user who posted the question.
Information in POST to '/addquestion': video, time, text, username

(youtube-video-url-ending) is the "AAAAAaBcDe" part for the youtube video at "https://www.youtube.com/watch?v=AAAAAaBcDe"
Video url: "/?video=(youtube-video-url-ending)"

# How to start the test server

Make sure you're in the root directory.
bower install
npm install
grunt reactifies
gulp compile
