# http-nodejs-benchmark

Several sources tell us that latency hurts 

Simple benchmark for different Node.js HTTP server.

# Usage

## Installation    
```bash
yarn
yarn dist/http-express/ install
yarn dev:build
```

## Run infra
```bash
yarn dev:infra
```

## Bench

```bash
k6 run k6.mjs
```
or
```bash
wrk -t4 -c100 -d30s http://localhost:8080/
```

Remember to change the port to test different server

- `8080`: plain http node
- `8081`: streaming http2 node
- `8082`: express

# Results

## node:http

```bash
mamluk@mamluk-desktop:~/Projects/generic/rewrk/rewrk/target/release$ ./rewrk -h http://localhost:8080 -t 4 -c 60 -d 60s --pct
Beginning round 1...
Benchmarking 60 connections @ http://localhost:8080 for 1 minute(s)
  Latencies:
    Avg      Stdev    Min      Max      
    2.19ms   0.56ms   0.28ms   66.50ms  
  Requests:
    Total: 1644139 Req/Sec: 27402.26
  Transfer:
    Total: 319.87 MB Transfer Rate: 5.33 MB/Sec
+ --------------- + --------------- +
|   Percentile    |   Avg Latency   |
+ --------------- + --------------- +
|      99.9%      |     6.19ms      |
|       99%       |     5.14ms      |
|       95%       |     3.76ms      |
|       90%       |     3.24ms      |
|       75%       |     2.86ms      |
|       50%       |     2.59ms      |
+ --------------- + --------------- +

```

## node:http2

```bash
mamluk@mamluk-desktop:~/Projects/generic/rewrk/rewrk/target/release$ ./rewrk -h http://localhost:8081 -t 4 -c 60 -d 60s --http2 --pct
Beginning round 1...
Benchmarking 60 connections @ http://localhost:8081 for 1 minute(s)
  Latencies:
    Avg      Stdev    Min      Max      
    4.11ms   0.61ms   0.73ms   91.89ms  
  Requests:
    Total: 876584  Req/Sec: 14609.84
  Transfer:
    Total: 36.03 MB Transfer Rate: 614.91 KB/Sec
+ --------------- + --------------- +
|   Percentile    |   Avg Latency   |
+ --------------- + --------------- +
|      99.9%      |     11.09ms     |
|       99%       |     7.47ms      |
|       95%       |     5.71ms      |
|       90%       |     5.27ms      |
|       75%       |     4.78ms      |
|       50%       |     4.44ms      |
+ --------------- + --------------- +

```

## express

```bash
mamluk@mamluk-desktop:~/Projects/generic/rewrk/rewrk/target/release$ ./rewrk -h http://localhost:8082 -t 4 -c 60 -d 60s --pct
Beginning round 1...
Benchmarking 60 connections @ http://localhost:8082 for 1 minute(s)
  Latencies:
    Avg      Stdev    Min      Max      
    7.24ms   2.24ms   0.52ms   350.06ms  
  Requests:
    Total: 497247  Req/Sec: 8287.47
  Transfer:
    Total: 113.34 MB Transfer Rate: 1.89 MB/Sec
+ --------------- + --------------- +
|   Percentile    |   Avg Latency   |
+ --------------- + --------------- +
|      99.9%      |     32.17ms     |
|       99%       |     15.91ms     |
|       95%       |     11.42ms     |
|       90%       |     10.23ms     |
|       75%       |     8.94ms      |
|       50%       |     7.92ms      |
+ --------------- + --------------- +
```

## Golang

```bash
mamluk@mamluk-desktop:~/Projects/generic/rewrk/rewrk/target/release$ ./rewrk -h http://localhost:8090 -t 4 -c 60 -d 60s --pct
Beginning round 1...
Benchmarking 60 connections @ http://localhost:8090 for 1 minute(s)
  Latencies:
    Avg      Stdev    Min      Max      
    0.38ms   0.19ms   0.03ms   36.98ms  
  Requests:
    Total: 9480567 Req/Sec: 158009.94
  Transfer:
    Total: 1.08 GB Transfer Rate: 18.38 MB/Sec
+ --------------- + --------------- +
|   Percentile    |   Avg Latency   |
+ --------------- + --------------- +
|      99.9%      |     1.98ms      |
|       99%       |     1.45ms      |
|       95%       |     0.97ms      |
|       90%       |     0.77ms      |
|       75%       |     0.60ms      |
|       50%       |     0.50ms      |
+ --------------- + --------------- +
```
