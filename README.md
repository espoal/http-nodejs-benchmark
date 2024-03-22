# http-nodejs-benchmark

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
mamluk@mamluk-XPS:~/Projects/generic$ wrk -t4 -c100 -d30s http://localhost:8080/ 
Running 30s test @ http://localhost:8080/
  4 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     5.31ms   19.62ms 525.37ms   99.19%
    Req/Sec     6.49k     0.99k   28.01k    93.33%
  775379 requests in 30.10s, 150.85MB read
Requests/sec:  25760.54
Transfer/sec:      5.01MB
```

```bash
mamluk@mamluk-desktop:~/Projects/generic/http-nodejs-benchmark$ k6 run k6.mjs

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: k6.mjs
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 1m0s max duration (incl. graceful stop):
              * default: 10 looping VUs for 30s (gracefulStop: 30s)


     data_received..................: 161 MB 5.4 MB/s
     data_sent......................: 63 MB  2.1 MB/s
     http_req_blocked...............: avg=1.05µs   min=481ns   med=912ns    max=1.51ms   p(90)=1.51µs   p(95)=1.72µs  
     http_req_connecting............: avg=2ns      min=0s      med=0s       max=203.97µs p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=351.79µs min=74.65µs med=311.44µs max=10.62ms  p(90)=563.15µs p(95)=616.45µs
       { expected_response:true }...: avg=351.79µs min=74.65µs med=311.44µs max=10.62ms  p(90)=563.15µs p(95)=616.45µs
     http_req_failed................: 0.00%  ✓ 0           ✗ 790656
     http_req_receiving.............: avg=15.1µs   min=6.06µs  med=13.7µs   max=7.76ms   p(90)=20.92µs  p(95)=23.44µs 
     http_req_sending...............: avg=4.44µs   min=2.02µs  med=3.97µs   max=2.27ms   p(90)=6.14µs   p(95)=6.83µs  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=332.24µs min=61.22µs med=291.81µs max=6.69ms   p(90)=543.08µs p(95)=595.92µs
     http_reqs......................: 790656 26354.74594/s
     iteration_duration.............: avg=374.29µs min=96.2µs  med=333.99µs max=11.13ms  p(90)=586.2µs  p(95)=639.67µs
     iterations.....................: 790656 26354.74594/s
     vus............................: 10     min=10        max=10  
     vus_max........................: 10     min=10        max=10 

```

## node:http2

wrk do not support `http/2`, we need a different tool.
k6 do not support prior knowledge of `http/2`, we need a different tool.

## express

```bash
mamluk@mamluk-XPS:~/Projects/generic$ wrk -t4 -c100 -d30s http://localhost:8082/Running 30s test @ http://localhost:8082/
  4 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    19.09ms   45.28ms   1.09s    99.02%
    Req/Sec     1.63k   178.21     1.79k    93.08%
  194478 requests in 30.01s, 44.33MB read
Requests/sec:   6480.43
Transfer/sec:      1.48MB
```

```bash
mamluk@mamluk-desktop:~/Projects/generic/http-nodejs-benchmark$ k6 run k6.mjs

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: k6.mjs
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 1m0s max duration (incl. graceful stop):
              * default: 10 looping VUs for 30s (gracefulStop: 30s)


     data_received..................: 61 MB  2.0 MB/s
     data_sent......................: 20 MB  676 kB/s
     http_req_blocked...............: avg=1.6µs   min=521ns    med=1.5µs    max=476.37µs p(90)=2.21µs  p(95)=2.47µs 
     http_req_connecting............: avg=8ns     min=0s       med=0s       max=395.21µs p(90)=0s      p(95)=0s     
     http_req_duration..............: avg=1.14ms  min=218.04µs med=956.81µs max=15.41ms  p(90)=1.85ms  p(95)=2.06ms 
       { expected_response:true }...: avg=1.14ms  min=218.04µs med=956.81µs max=15.41ms  p(90)=1.85ms  p(95)=2.06ms 
     http_req_failed................: 0.00%  ✓ 0           ✗ 253359
     http_req_receiving.............: avg=24.81µs min=6.89µs   med=24.06µs  max=3.19ms   p(90)=34.18µs p(95)=37.27µs
     http_req_sending...............: avg=6.28µs  min=2.36µs   med=6.08µs   max=1.19ms   p(90)=8.6µs   p(95)=9.51µs 
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s       max=0s       p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=1.11ms  min=177.99µs med=926.8µs  max=15.35ms  p(90)=1.82ms  p(95)=2.03ms 
     http_reqs......................: 253359 8444.979165/s
     iteration_duration.............: avg=1.17ms  min=261.14µs med=990.4µs  max=15.76ms  p(90)=1.89ms  p(95)=2.09ms 
     iterations.....................: 253359 8444.979165/s
     vus............................: 10     min=10        max=10  
     vus_max........................: 10     min=10        max=10  


running (0m30.0s), 00/10 VUs, 253359 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  30s

```
