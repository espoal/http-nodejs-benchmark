# http-nodejs-benchmark

Several sources tell us that latency hurts conversion rate: 
A recent study by [Akamai](https://s3.amazonaws.com/sofist-marketing/State+of+Online+Retail+Performance+Spring+2017+-+Akamai+and+SOASTA+2017.pdf)
, and corroborated by [Google](https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/load-time-to-conversion-statistics/),
found that a 100-millisecond delay in website load time can hurt conversion rates by 7%, 
while one second can hurt conversion rates by 70%.

With this in mind we try to measure the overhead of the HTTP protocol in NodeJS, and we propose a novel approach
based on delegating HTTP termination to an external process, in this case, a Golang binary.
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
- `8090`: http golang

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

## bun:http

```bash
mamluk@mamluk-desktop:~/Projects/generic/rewrk/rewrk/target/release$ ./rewrk -h http://localhost:8070 -t 4 -c 60 -d 60s --pct
Beginning round 1...
Benchmarking 60 connections @ http://localhost:8070 for 1 minute(s)
  Latencies:
    Avg      Stdev    Min      Max      
    0.62ms   0.14ms   0.07ms   3.84ms   
  Requests:
    Total: 5828674 Req/Sec: 97144.61
  Transfer:
    Total: 767.09 MB Transfer Rate: 12.78 MB/Sec
+ --------------- + --------------- +
|   Percentile    |   Avg Latency   |
+ --------------- + --------------- +
|      99.9%      |     1.73ms      |
|       99%       |     1.35ms      |
|       95%       |     1.11ms      |
|       90%       |     0.97ms      |
|       75%       |     0.78ms      |
|       50%       |     0.69ms      |
+ --------------- + --------------- +
```

## bun:express

```bash
mamluk@mamluk-desktop:~/Projects/generic/rewrk/rewrk/target/release$ ./rewrk -h http://localhost:8080 -t 4 -c 60 -d 60s --pct 
Beginning round 1...
Benchmarking 60 connections @ http://localhost:8080 for 1 minute(s)
  Latencies:
    Avg      Stdev    Min      Max      
    3.36ms   0.77ms   0.26ms   20.48ms  
  Requests:
    Total: 1071588 Req/Sec: 17859.75
  Transfer:
    Total: 196.21 MB Transfer Rate: 3.27 MB/Sec
+ --------------- + --------------- +
|   Percentile    |   Avg Latency   |
+ --------------- + --------------- +
|      99.9%      |     10.00ms     |
|       99%       |     7.30ms      |
|       95%       |     5.69ms      |
|       90%       |     5.05ms      |
|       75%       |     4.44ms      |
|       50%       |     3.86ms      |
+ --------------- + --------------- +
```

## deno:http

```bash
mamluk@mamluk-desktop:~/Projects/generic/rewrk/rewrk/target/release$ ./rewrk -h http://localhost:8060 -t 4 -c 60 -d 60s --pct
Beginning round 1...
Benchmarking 60 connections @ http://localhost:8060 for 1 minute(s)
  Latencies:
    Avg      Stdev    Min      Max      
    0.75ms   0.10ms   0.08ms   7.03ms   
  Requests:
    Total: 4767452 Req/Sec: 79457.49
  Transfer:
    Total: 732.00 MB Transfer Rate: 12.20 MB/Sec
+ --------------- + --------------- +
|   Percentile    |   Avg Latency   |
+ --------------- + --------------- +
|      99.9%      |     1.92ms      |
|       99%       |     1.18ms      |
|       95%       |     1.01ms      |
|       90%       |     0.95ms      |
|       75%       |     0.88ms      |
|       50%       |     0.82ms      |
+ --------------- + --------------- +
```
## deno:http2

```bash
mamluk@mamluk-desktop:~/Projects/generic/rewrk/rewrk/target/release$ ./rewrk -h http://localhost:8060 -t 4 -c 60 -d 60s --http2 --pct
Beginning round 1...
Benchmarking 60 connections @ http://localhost:8060 for 1 minute(s)
  Latencies:
    Avg      Stdev    Min      Max      
    1.06ms   0.16ms   0.47ms   44.27ms  
  Requests:
    Total: 3406127 Req/Sec: 56768.94
  Transfer:
    Total: 159.25 MB Transfer Rate: 2.65 MB/Sec
+ --------------- + --------------- +
|   Percentile    |   Avg Latency   |
+ --------------- + --------------- +
|      99.9%      |     2.11ms      |
|       99%       |     1.52ms      |
|       95%       |     1.39ms      |
|       90%       |     1.34ms      |
|       75%       |     1.22ms      |
|       50%       |     1.13ms      |
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

## Node UDS + Golang HTTP

```bash
mamluk@mamluk-desktop:~/Projects/generic/rewrk/rewrk/target/release$ ./rewrk -h http://localhost:8090 -t 1 -c 1 -d 60s --pct
Beginning round 1...
Benchmarking 1 connections @ http://localhost:8090 for 1 minute(s)
  Latencies:
    Avg      Stdev    Min      Max      
    0.10ms   0.02ms   0.04ms   0.66ms   
  Requests:
    Total: 628185  Req/Sec: 10469.72
  Transfer:
    Total: 83.27 MB Transfer Rate: 1.39 MB/Sec
+ --------------- + --------------- +
|   Percentile    |   Avg Latency   |
+ --------------- + --------------- +
|      99.9%      |     0.31ms      |
|       99%       |     0.18ms      |
|       95%       |     0.15ms      |
|       90%       |     0.14ms      |
|       75%       |     0.12ms      |
|       50%       |     0.11ms      |
+ --------------- + --------------- +

```

## Rust:actix-web

```bash
mamluk@mamluk-desktop:~/Projects/generic/rewrk/rewrk/target/release$ ./rewrk -h http://localhost:8050/app/index -t 4 -c 60 -d 60s --pct 
Beginning round 1...
Benchmarking 60 connections @ http://localhost:8050/app/index for 1 minute(s)
  Latencies:
    Avg      Stdev    Min      Max      
    0.35ms   0.11ms   0.03ms   5.85ms   
  Requests:
    Total: 10378027 Req/Sec: 172966.58
  Transfer:
    Total: 1.43 GB Transfer Rate: 24.41 MB/Sec
+ --------------- + --------------- +
|   Percentile    |   Avg Latency   |
+ --------------- + --------------- +
|      99.9%      |     0.82ms      |
|       99%       |     0.66ms      |
|       95%       |     0.58ms      |
|       90%       |     0.54ms      |
|       75%       |     0.49ms      |
|       50%       |     0.43ms      |
+ --------------- + --------------- +
```
