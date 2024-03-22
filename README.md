# http-nodejs-benchmark

Simple benchmark for different Node.js HTTP server.

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

## node:http2

wrk do not support `http/2`, we need a different tool.

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
