pm2 start server.js
ls
pm2 list
pm2 stop server.js
pm2 stop 0

pm2 comes with cluster modules built in

pm2 stop server.js -i max

pm2 delete server

pm2 start server.js -l logs.txt -i max

pm2 show

pm2 stop 2
pm2 start 2

pm2 monit

zero DOwn time restart

/\*\*

- On Node Js Event Blocking
- Focusing on how to optimize he node application.
- Most of the js code runs on a single loop in a single thread
  \*sending back the response to the browser
-
- Node and event loop can joggle
-
- Things that can increase response time in nodejs
- JSON.stringify({})="{}"
- JSON.parse("{}")={}
- [5,3,1,2].sort()
-
- Worker Cluster Work in Round Robin Approach
  used for load balancing

In node we can use the cluster module to do load balancing of request
as they come in to the node module

And those cluster module uses Round Robin approach to determine which process would handle the requests

Using PM2

Using PM2 for Zero Down Time Runni ng
